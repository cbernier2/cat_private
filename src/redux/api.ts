import {CatQueryFnParams} from '../api/types';
import {BaseQueryApi} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import {RootState} from './index';
import {sub as dateSub} from 'date-fns';
import {logoutAsyncAction, refreshTokenAsyncAction} from './user/user-slice';

export const catBaseQuery = async (
  baseUrl: string,
  {method, path, queryParams}: CatQueryFnParams,
  {getState, dispatch}: BaseQueryApi,
) => {
  const state = () => getState() as RootState;
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
    const response = await fetch(`${baseUrl}/${path}${urlParams}`, {
      method,
      headers: {
        Authorization: `${auth?.tokenType} ${auth?.accessToken}`,
      },
    });
    if (response.status >= 200 && response.status <= 299) {
      return {data: await response.json()};
    } else {
      if (response.status === 401) {
        await dispatch(logoutAsyncAction());
      }
      return {error: {status: response.status, data: response}};
    }
  } catch (e) {
    return {error: {status: -1, data: e}};
  }
};
