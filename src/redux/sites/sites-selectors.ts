import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Site} from './sites-slice';

export const sitesErrorSelector = createSelector(
  (state: RootState) => state.sites.error,
  error => error,
);

export const sitesLoadingSelector = createSelector(
  (state: RootState) => state.sites.loading,
  loading => loading,
);

export const sitesSelectedSiteSelector = createSelector(
  (state: RootState) => state.sites,
  siteState =>
    siteState.sites.find(
      (site: Site) => site.id === siteState.selectedSiteId,
    ) ?? null,
);

export const sitesSitesSelector = createSelector(
  (state: RootState) => state.sites.sites,
  sites => sites,
);
