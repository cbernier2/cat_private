import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchSiteAsyncAction, key} from './site-slice';
import moment from 'moment';
import {sleep} from '../../utils/promise';
import {RootState} from '../index';

const CAT_SITE_REFRESH_FREQUENCY_SECONDS = 60 * 5;
const CAT_SITE_REFRESH_FREQUENCY_MS = CAT_SITE_REFRESH_FREQUENCY_SECONDS * 1000;

export const fetchSiteIfNeededAsyncAction = createAsyncThunk(
  `${key}/fetchSiteIfNeededAsyncAction`,
  async (_, {getState, dispatch}) => {
    const state = getState() as RootState;
    if (!state.sitesList.selectedSiteUrl || state.site.loading) {
      return CAT_SITE_REFRESH_FREQUENCY_MS;
    } else {
      const elapsed = moment.utc().valueOf() - (state.site.lastUpdate || 0);
      if (elapsed >= CAT_SITE_REFRESH_FREQUENCY_MS) {
        await dispatch(fetchSiteAsyncAction());
        return CAT_SITE_REFRESH_FREQUENCY_MS;
      } else {
        return CAT_SITE_REFRESH_FREQUENCY_MS - elapsed;
      }
    }
  },
);

let isBackgroundFetchStarted = false;
export const startBackgroundFetchAsyncAction = createAsyncThunk(
  `${key}/startBackgroundFetchAction`,
  async (_, {dispatch}) => {
    if (isBackgroundFetchStarted) {
      return;
    }
    isBackgroundFetchStarted = true;
    while (isBackgroundFetchStarted) {
      const nextSleep = await dispatch(fetchSiteIfNeededAsyncAction());
      await sleep(nextSleep.payload as number);
    }
  },
);
