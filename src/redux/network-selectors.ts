import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './index';

export const networkIsConnectedSelector = createSelector(
  (state: RootState) => state.network.isConnected,
  isConnected => isConnected,
);
