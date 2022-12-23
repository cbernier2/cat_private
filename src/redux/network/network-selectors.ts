import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

export const isConnectedSelector = createSelector(
  (state: RootState) => state.network.isConnected,
  isConnected => isConnected,
);
