import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {sub as dateSub} from 'date-fns';
import {RootState} from '../index';
import {invalidateToken, refreshTokenAsyncAction} from '../user-slice';
import {
  GetAllProductionParams,
  GetAllProductionResult,
  GetProductionCountResult,
  GetShiftsResult,
} from './types/api';

const catBaseQuery: BaseQueryFn<{
  method: string;
  path: string;
  queryParams?: Record<string, any>;
}> = async ({method, path, queryParams}, {getState, dispatch}) => {
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
    getProductionCount: builder.query<GetProductionCountResult, void>({
      query: () => ({path: 'production/all/count', method: 'GET'}),
    }),
    getAllProduction: builder.query<
      GetAllProductionResult,
      GetAllProductionParams
    >({
      query: queryParams => ({
        path: 'production/all/find',
        method: 'GET',
        queryParams,
      }),
    }),
    getShifts: builder.query<GetShiftsResult, void>({
      query: () => ({path: 'shift/find', method: 'GET'}),
    }),
  }),
});
