import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Site} from './sites-slice';

export const sitesErrorSelector = createSelector(
  (state: RootState) => state.sitesList.error,
  error => error,
);

export const sitesLoadingSelector = createSelector(
  (state: RootState) => state.sitesList.loading,
  loading => loading,
);

export const sitesSelectedSiteSelector = createSelector(
  (state: RootState) => state.sitesList.sites,
  (state: RootState) => state.sitesList.selectedSiteId,
  (sites, selectedSiteId) =>
    sites.find((site: Site) => site.id === selectedSiteId) ?? null,
);

export const sitesSitesSelector = createSelector(
  (state: RootState) => state.sitesList.sites,
  sites => sites,
);
