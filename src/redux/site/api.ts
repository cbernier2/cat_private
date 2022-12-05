import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';

import {
  CatOperatorInfo,
  CatPersons,
  CatQueryFnParams,
  CatSiteConfig,
} from '../../api/types';
import {OperatorInfo} from '../../api/types/cat/operator-info';
import {Material} from '../../api/types/cat/material';
import {ProductionSummary} from '../../api/types/cat/production';
import {Shift} from '../../api/types/cat/shift';
import {findMostRecentShift} from '../../api/shift';
import {CatHaulCycle} from '../../api/types/haul-cycle';

import {RootState} from '../index';
import {catBaseQuery} from '../api';
import {ObservationDO} from '../../api/types/cat/observation';

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

const baseQuery: BaseQueryFn<CatQueryFnParams> = async (params, api) => {
  const state = () => api.getState() as RootState;
  const sitesList = state().sitesList;
  const selectedSite = sitesList.sites.find(
    site => site.siteUrl === sitesList.selectedSiteUrl,
  );
  if (selectedSite === undefined) {
    return {error: {status: -1, data: new Error('Site not selected')}};
  }
  return await catBaseQuery(
    `${selectedSite.siteUrl}/core/site/mobile_api/v1`,
    params,
    api,
  );
};

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getCurrentShifts: builder.query<Shift[] | null, void>({
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
    }),

    getOperatorInfo: builder.query<CatOperatorInfo | null, {shiftId: string}>({
      query: queryParams => ({
        path: 'operatorInfo/findForShift',
        method: 'GET',
        queryParams,
      }),
      transformResponse: (response: {operatorInfos: OperatorInfo[]}[]) => {
        const operatorInfos = response[0].operatorInfos;
        const result: CatOperatorInfo = {};
        operatorInfos.forEach(info => {
          if (info.id) {
            result[info.id] = info;
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

    cyclesForShift: builder.query<CatHaulCycle[], {shiftId: string}>({
      query: queryParams => ({
        path: 'production/cycles/findForShift',
        method: 'GET',
        queryParams,
      }),
    }),

    observationsByTimeRange: builder.query<
      ObservationDO[],
      {startTime: number; endTime: number}
    >({
      query: queryParams => ({
        path: 'observation/findByTimeRange',
        method: 'GET',
        queryParams,
      }),
    }),
  }),
});
