import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

export const configSelector = createSelector(
  (state: RootState) => state.site.config,
  config => config,
);

export const productionSummarySelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  summary => summary,
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
