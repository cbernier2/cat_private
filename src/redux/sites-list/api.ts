import {sub as dateSub} from 'date-fns';
import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';

import {logoutAsyncAction, refreshTokenAsyncAction} from '../user/user-slice';
import {RootState} from '../index';

import {Site} from './sites-slice';

// Because the sites endpoint is on `dev.` and rasvalleyclone is on `stage.`,
//  rasvalleyclone is not returned in the response.
// Continue including it so we can have two usable sites
const mockSitesList: Site[] = [
  {
    country: null,
    companyName: null,
    siteId: null,
    siteName: 'DEV hCODED Rasmussen Valley',
    siteUrl: 'https://stage.minestar.com/rasvalleyclone',
  },
];

const baseQuery: BaseQueryFn = async (_, {getState, dispatch}) => {
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

  // TODO create constants for the various envs we'll support or set in ENV/BUILD vars
  //  dev: 'dev', staging: 'stage', prod: 'edge'
  try {
    const response = await fetch(
      'https://dev.minestar.com/landing/mobile_api/v1/security/authorizedSites',
      {
        method: 'GET',
        headers: {
          Authorization: `${auth?.tokenType} ${auth?.accessToken}`,
        },
      },
    );
    if (response.status >= 200 && response.status <= 299) {
      // TODO remove temp extra mock data
      return {data: [...mockSitesList, ...(await response.json())]};
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

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    fetchAuthorizedSites: builder.query<Site[] | null, void>({
      query: () => '',
      transformResponse: (sites: Site[]) =>
        sites
          .filter(site => site.siteUrl) // Filter out the unlikely cases where siteUrl would be null or empty
          .map(site => ({
            ...site,
            // Trailing slashes force us into an infinite login/logout loop, remove them.
            //  Check for trailing spaces while we're at it.
            siteUrl: site.siteUrl.replace(/\/*\s*$/, ''),
          }))
          .sort((a, b) => (a.siteName ?? '').localeCompare(b.siteName ?? '')),
    }),
  }),
});
