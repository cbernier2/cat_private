import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {sub as dateSub} from 'date-fns';
import {RootState} from '../index';
import {invalidateToken, refreshTokenAsyncAction} from '../user/user-slice';
import {CatConfig, CatPersons, CatQueryFnParams} from '../../api/types';
import {ProductionSummary} from '../../api/types/cat/production';
import {Shift} from '../../api/types/cat/shift';
import {findMostRecentShift} from '../../api/shift';
import {ConfigItem} from '../../api/types/cat/config-item';
import {Material} from '../../api/types/cat/material';
import {onConfigChange} from '../../api/config';
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
  let auth = (getState() as RootState).user.auth;
  if (auth) {
    if (
      new Date(auth.accessTokenExpirationDate) <
      dateSub(new Date(), {minutes: 1})
    ) {
      await dispatch(refreshTokenAsyncAction());
      auth = (getState() as RootState).user.auth;
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
      `https://stage.minestar.com/rasvalleyclone/core/site/mobile_api/v1/${path}${urlParams}`,
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
    productionSummaryForShift: builder.query<
      ProductionSummary | null,
      {shiftId: string}
    >({
      query: queryParams => ({
        path: 'production/findForShift',
        method: 'GET',
        queryParams: {page: 1, ...queryParams},
      }),
      transformResponse: (productionSummaries: ProductionSummary[]) => {
        if (productionSummaries.length) {
          // TODO: Fix redux persist AsyncStorage or the ProductSummary structure so that it can be saved
          const productionSummary = productionSummaries[0];
          return {
            id: productionSummary.id,
            shiftId: productionSummary.shiftId,
            siteSummary: productionSummary.siteSummary,
            siteLoadSummary: productionSummary.siteLoadSummary,
            materialSummaries: [],
            loadAreaSummaries: [],
            dumpSummaries: [],
            loadEquipSummaries: [],
            crusherSummaries: [],
            haulEquipSummaries: [],
            supportEquipSummaries: [],
            waterTruckSummaries: [],
            routeSummaries: [],
          };
        } else {
          return null;
        }
      },
    }),
    getConfig: builder.query<CatConfig, void>({
      query: () => ({path: 'config/find', method: 'GET'}),
      transformResponse: (configItems: ConfigItem[]) => {
        const result: CatConfig = {};
        configItems.forEach(configItem => {
          result[configItem.name] = configItem.value;
        });
        onConfigChange(result);
        return result;
      },
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
    getMaterials: builder.query<Material[], void>({
      query: () => ({path: 'material/find', method: 'GET'}),
    }),
  }),
});
