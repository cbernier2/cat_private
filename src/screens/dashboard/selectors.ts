import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';

export const activeRoutesSelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  productionSummary =>
    (productionSummary?.routeSummaries ?? [])
      .slice()
      .sort((a, b) => a.route.name.localeCompare(b.route.name)),
);
