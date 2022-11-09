import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {ConfigItemName} from '../../api/types/cat/config-item';
import {CommonConstants} from '../../api/types/cat/common';

export const configSelector = createSelector(
  (state: RootState) => state.site.config,
  config => config,
);

export const systemUnitTypeSelector = createSelector(
  (state: RootState) => state.site.config,
  config =>
    config[ConfigItemName.PRODUCTION_UNIT_TYPE] ||
    CommonConstants.DEFAULT_UNIT_TYPE_VALUE,
);

export const productionSummarySelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  summary => summary,
);

export const currentRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.currentRouteId,
  (routeSummaries, selectedRoute) => {
    if (routeSummaries && selectedRoute) {
      return routeSummaries.find(
        routeSummary => routeSummary.id === selectedRoute,
      );
    } else {
      return undefined;
    }
  },
);

export const personsSelector = createSelector(
  (state: RootState) => state.site.persons,
  persons => persons,
);

export const materialsSelector = createSelector(
  (state: RootState) => state.site.materials,
  materials => materials,
);

export const siteIsLoadingSelector = createSelector(
  (state: RootState) => state.site.loading,
  loading => loading,
);
