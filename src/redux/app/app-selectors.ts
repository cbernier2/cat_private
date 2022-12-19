import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {darkTheme} from '../../themes/darkTheme';
import {lightTheme} from '../../themes/lightTheme';

export const themeSelector = createSelector(
  (state: RootState) => state.app.isThemeDark,
  isThemeDark => (isThemeDark ? darkTheme : lightTheme),
);

export const emulateOfflineSelector = createSelector(
  (state: RootState) => state.app.emulateOffline,
  emulateOffline => emulateOffline,
);

export const searchHistorySelector = createSelector(
  (state: RootState) => state.app.searchHistory,
  searchHistory => searchHistory.map(searchTerm => searchTerm.term),
);
