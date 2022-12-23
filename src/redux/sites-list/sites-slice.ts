import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';

import {createOfflineAsyncThunk} from '../../utils/offline';

import {logoutAsyncAction} from '../user/user-slice';
import {fetchSiteAsyncAction} from '../site/site-slice';
import {apiResult} from '../site/api';
import {catPersistReducer} from '../utils';

import {sitesApi} from './api';

export const key = 'sitesList';

export interface Site {
  companyName: string | null;
  country: string | null;
  siteId: string | null; // Yes, id CAN be null...
  siteName: string; // Not unique
  siteUrl: string; // Best choice for a unique identifier so far
}

export interface SitesState {
  error: string | null;
  loading: boolean;
  previousSiteUrl: string | null;
  sites: Site[];
  selectedSiteUrl: string | null;
}

const initialState: SitesState = {
  error: null,
  loading: false,
  previousSiteUrl: null,
  sites: [],
  selectedSiteUrl: null,
};

export const fetchSitesAsyncAction = createAsyncThunk(
  `${key}/fetchSites`,
  async (_, {dispatch, rejectWithValue}) => {
    try {
      // return mockSitesList;
      return await apiResult(
        dispatch(sitesApi.endpoints.fetchAuthorizedSites.initiate()),
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const selectSiteAsyncAction = createOfflineAsyncThunk<void, Site | null>(
  `${key}/selectSite`,
  async (_, {dispatch}) => {
    await dispatch(fetchSiteAsyncAction());
  },
  {
    offlineOptions: {
      meta: {
        retry: false,
      },
    },
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logoutAsyncAction.pending, state => {
        // TODO clear this when signing in with a different user than
        //  the one that's persisted instead of onLogout?
        state.selectedSiteUrl = null;
      })
      .addCase(fetchSitesAsyncAction.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchSitesAsyncAction.rejected, (state, action) => {
        console.error(action);
        state.error = 'cat.login_server_error';
        state.loading = false;
      })
      .addCase(fetchSitesAsyncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload;
      })
      .addCase(selectSiteAsyncAction.pending, (state, action) => {
        state.previousSiteUrl = state.selectedSiteUrl;
        state.selectedSiteUrl = action.meta.arg?.siteUrl || null;
      })
      .addCase(fetchSiteAsyncAction.rejected, state => {
        // Revert to previous siteUrl if an error occurred while trying to fetch new site
        //  This prevents miss-matching site title and data
        state.selectedSiteUrl = state.previousSiteUrl;
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const sitesReducer = catPersistReducer(
  {
    key,
    blacklist: ['error', 'loading'],
  },
  typedReducer,
);

export const {} = slice.actions;

export default sitesReducer;
