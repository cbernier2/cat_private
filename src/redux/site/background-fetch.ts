import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchSiteAsyncAction, key} from './site-slice';
import moment from 'moment';
import {sleep} from '../../utils/promise';
import {RootState} from '../index';

const CAT_SITE_REFRESH_FREQUENCY_SECONDS = 60 * 15;
const CAT_SITE_REFRESH_FREQUENCY_MS = CAT_SITE_REFRESH_FREQUENCY_SECONDS * 1000;

let isBackgroundFetchStarted = false;

export const startBackgroundFetchAsyncAction = createAsyncThunk(
  `${key}/startBackgroundFetchAction`,
  async (_, {getState, dispatch}) => {
    if (isBackgroundFetchStarted) {
      return;
    }
    isBackgroundFetchStarted = true;
    while (isBackgroundFetchStarted) {
      const state = getState() as RootState;
      if (!state.sitesList.selectedSiteId || state.site.loading) {
        await sleep(CAT_SITE_REFRESH_FREQUENCY_MS);
      } else {
        const elapsed = moment.utc().valueOf() - (state.site.lastUpdate || 0);
        if (elapsed >= CAT_SITE_REFRESH_FREQUENCY_MS) {
          await dispatch(fetchSiteAsyncAction());
          await sleep(CAT_SITE_REFRESH_FREQUENCY_MS);
        } else {
          await sleep(CAT_SITE_REFRESH_FREQUENCY_MS - elapsed);
        }
      }
    }
  },
);
