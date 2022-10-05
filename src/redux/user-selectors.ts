import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './index';

export const userNameSelector = createSelector(
  (state: RootState) => state.user.name,
  name => name || '',
);
