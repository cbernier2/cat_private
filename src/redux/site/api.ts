import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {sub as dateSub} from 'date-fns';
import {RootState} from '../index';
import {invalidateToken, refreshTokenAsyncAction} from '../user/user-slice';
import {CatQueryFnParams, GetShiftsResult} from '../../api/types';
import {ProductionSummary} from '../../api/types/cat/production';

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
    getShifts: builder.query<GetShiftsResult, void>({
      query: () => ({path: 'shift/find', method: 'GET'}),
    }),
    productionSummaryForShift: builder.query<
      ProductionSummary[],
      {shiftId: string}
    >({
      query: queryParams => ({
        path: 'production/findForShift',
        method: 'GET',
        queryParams: {page: 1, ...queryParams},
      }),
    }),
  }),
});
