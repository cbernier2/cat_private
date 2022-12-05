import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {Site} from './sites-slice';
import {catBaseQuery} from '../api';
import {CatQueryFnParams} from '../../api/types';

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

const baseQuery: BaseQueryFn<CatQueryFnParams> = async (params, api) => {
  // TODO create constants for the various envs we'll support or set in ENV/BUILD vars
  //  dev: 'dev', staging: 'stage', prod: 'edge'
  const result = await catBaseQuery(
    'https://dev.minestar.com/landing/mobile_api/v1',
    params,
    api,
  );
  if (!result.error) {
    // TODO remove temp extra mock data
    result.data = [...mockSitesList, ...result.data];
  }
  return result;
};

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    fetchAuthorizedSites: builder.query<Site[] | null, void>({
      query: () => ({path: 'security/authorizedSites', method: 'GET'}),
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
