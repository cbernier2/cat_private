import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {sleep} from '../../utils/promise';

import {logoutAsyncAction} from '../user-slice';
import {catApi} from './api';
import {Summary} from './types/production';

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
  summaries?: Summary[];
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
    await sleep(500);
    return mockSitesList;
  },
);

export const apiResult = async <T extends {error?: unknown; data?: unknown}>(
  dispatchResult: Promise<T>,
): Promise<NonNullable<T['data']>> => {
  const result = await dispatchResult;
  if (result.error) {
    throw result.error;
  } else if (result.data) {
    return result.data;
  } else {
    throw null;
  }
};

export const fetchSiteAsyncAction = createAsyncThunk(
  `${key}/fetchSite`,
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const result: Summary[] = [];
      const count = await apiResult(
        dispatch(catApi.endpoints.getProductionCount.initiate()),
      );
      const pageCount = Math.ceil(count.rowCount / count.rowsPerPage);
      for (let page = 1; page <= pageCount; page++) {
        const summaries = await apiResult(
          dispatch(catApi.endpoints.getAllProduction.initiate({page})),
        );
        result.push(...summaries);
      }
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const selectSiteAsyncAction = createAsyncThunk<void, Site | null>(
  `${key}/selectSite`,
  async (_, {dispatch}) => {
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
      })
      .addCase(fetchSiteAsyncAction.fulfilled, (state, action) => {
        state.summaries = action.payload;
      })
      .addCase(selectSiteAsyncAction.pending, (state, action) => {
        state.selectedSiteId = action.meta.arg?.id || null;
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

export const {} = slice.actions;

export default sitesReducer;
