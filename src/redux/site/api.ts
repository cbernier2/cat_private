import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {sub as dateSub} from 'date-fns';

import {CatPersons, CatQueryFnParams, CatSiteConfig} from '../../api/types';
import {Material} from '../../api/types/cat/material';
import {ProductionSummary} from '../../api/types/cat/production';
import {Shift} from '../../api/types/cat/shift';
import {findMostRecentShift} from '../../api/shift';

import {RootState} from '../index';
import {invalidateToken, refreshTokenAsyncAction} from '../user/user-slice';
import {Person} from '../../api/types/cat/person';

export const apiResult = async <T extends {error?: unknown; data?: unknown}>(
  dispatchResult: Promise<T>,
): Promise<NonNullable<T['data']>> => {
  const result = await dispatchResult;
  if (result.error) {
    throw result.error;
  } else if (result.data) {
    return result.data;
  } else {
    throw null;
  }
};

const catBaseQuery: BaseQueryFn<CatQueryFnParams> = async (
  {method, path, queryParams},
  {getState, dispatch},
) => {
  const state = () => getState() as RootState;
  const sitesList = state().sitesList;
  const selectedSite = sitesList.sites.find(
    site => site.id === sitesList.selectedSiteId,
  );
  if (selectedSite === undefined) {
    return {error: {status: -1, data: new Error('Site not selected')}};
  }
  let auth = state().user.auth;
  if (auth) {
    if (
      new Date(auth.accessTokenExpirationDate) <
      dateSub(new Date(), {minutes: 1})
    ) {
      await dispatch(refreshTokenAsyncAction());
      auth = state().user.auth;
    }
  }
  try {
    let urlParams = '';
    if (queryParams) {
      const urlParamsObj: Record<string, string> = {};
      Object.keys(queryParams).forEach(key => {
        urlParamsObj[key] = String(queryParams[key]);
      });
      urlParams = '?' + new URLSearchParams(urlParamsObj);
    }
    const response = await fetch(
      //TODO: Use the current site URL
      `${selectedSite.siteUrl}/core/site/mobile_api/v1/${path}${urlParams}`,
      {
        method,
        headers: {
          Authorization: `${auth?.tokenType} ${auth?.accessToken}`,
        },
      },
    );
    if (response.status >= 200 && response.status <= 299) {
      return {data: await response.json()};
    } else {
      if (response.status === 401) {
        dispatch(invalidateToken());
      }
      return {error: {status: response.status, data: response}};
    }
  } catch (e) {
    return {error: {status: -1, data: e}};
  }
};

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: catBaseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getCurrentShifts: builder.query<Shift | null, void>({
      query: () => ({path: 'shift/find', method: 'GET'}),
      transformResponse: (shifts: Shift[]) => {
        return findMostRecentShift(shifts);
      },
    }),

    getMaterials: builder.query<Material[] | null, void>({
      query: () => ({path: 'material/find', method: 'GET'}),
    }),

    getSiteConfiguration: builder.query<CatSiteConfig[] | null, void>({
      query: () => ({path: 'config/find', method: 'GET'}),
    }),

    getPersons: builder.query<CatPersons, void>({
      query: () => ({path: 'person/find', method: 'GET'}),
      transformResponse: (persons: Person[]) => {
        const result: CatPersons = {};
        persons.forEach(person => {
          if (person.userName) {
            result[person.userName] = person;
          }
        });
        return result;
      },
    }),

    productionSummaryForShift: builder.query<
      ProductionSummary | null,
      {shiftId: string}
    >({
      query: queryParams => ({
        path: 'production/findForShift',
        method: 'GET',
        queryParams,
      }),
      transformResponse: (productionSummaries: ProductionSummary[]) => {
        return productionSummaries.length ? productionSummaries[0] : null;
      },
    }),
  }),
});
