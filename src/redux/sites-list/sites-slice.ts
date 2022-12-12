import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';

import {logoutAsyncAction} from '../user/user-slice';
import {fetchSiteAsyncAction, actions as siteActions} from '../site/site-slice';
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
  sites: Site[];
  selectedSiteUrl: string | null;
}

const initialState: SitesState = {
  error: null,
  loading: false,
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

export const selectSiteAsyncAction = createAsyncThunk<void, Site | null>(
  `${key}/selectSite`,
  async (_, {dispatch}) => {
    await dispatch(siteActions.siteSelected());
    await dispatch(fetchSiteAsyncAction());
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
        state.selectedSiteUrl = action.meta.arg?.siteUrl || null;
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
