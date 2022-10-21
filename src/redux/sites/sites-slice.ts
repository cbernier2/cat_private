import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {sleep} from '../../utils/promise';

import {logout} from '../user-slice';

export const key = 'sites';

// TODO review when API is ready
export interface Site {
  id: string;
  name: string;
}

// TODO review when API is ready
export interface SitesState {
  error: Error | null;
  loading: boolean;
  sites: Site[];
  selectedSiteId: string | null;
}

const initialState: SitesState = {
  error: null,
  loading: false,
  sites: [],
  selectedSiteId: null,
};

const mockSitesList: Site[] = [
  {
    id: 'rasvalleyclone',
    name: 'Rasmussen Valley Clone',
  },
  {
    id: 'floridacanyonclone',
    name: 'Florida Canyon Clone',
  },
];
export const fetchSitesAsyncAction = createAsyncThunk(
  `${key}/fetchSites`,
  // TODO add required parameters based on API endpoint; hit endpoint
  async () => {
    await sleep(5000);
    return mockSitesList;
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    selectSite: (state, action) => {
      state.selectedSiteId = action.payload?.id || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout, state => {
        // TODO clear this when signing in with a different user than
        //  the one that's persisted instead of onLogout?
        state.selectedSiteId = null;
      })
      .addCase(fetchSitesAsyncAction.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchSitesAsyncAction.rejected, state => {
        state.error = new Error('genericErrorMessage');
        state.loading = false;
      })
      .addCase(fetchSitesAsyncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload;
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const sitesReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['sites', 'selectedSite'],
  },
  typedReducer,
);

export const {selectSite} = slice.actions;

export default sitesReducer;
