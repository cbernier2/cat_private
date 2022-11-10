import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiResult, catApi} from './api';
import {Shift} from '../../api/types/cat/shift';
import {ProductionSummary} from '../../api/types/cat/production';
import {CatPersons, CatConfig} from '../../api/types';
import {Material} from '../../api/types/cat/material';
import moment from 'moment';

export const key = 'site';

export interface SiteState {
  loading: boolean;
  lastUpdate: number | null;
  currentRouteId: string | null;
  config: CatConfig;
  persons: CatPersons;
  currentShift: Shift | null;
  productionSummary: ProductionSummary | null;
  materials: Material[];
}

const initialState: SiteState = {
  loading: false,
  lastUpdate: null,
  currentRouteId: null,
  config: {},
  persons: {},
  currentShift: null,
  productionSummary: null,
  materials: [],
};

export const fetchPersonsAsyncAction = createAsyncThunk(
  `${key}/fetchPersons`,
  async (_, {dispatch, rejectWithValue}) => {
    try {
      return await apiResult(dispatch(catApi.endpoints.getPersons.initiate()));
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchSiteAsyncAction = createAsyncThunk(
  `${key}/fetchSite`,
  async (_, {dispatch, rejectWithValue}) => {
    // No await because it is a slow query
    dispatch(fetchPersonsAsyncAction());

    try {
      const currentShift = await apiResult(
        dispatch(catApi.endpoints.getCurrentShifts.initiate()),
      );
      let productionSummary: ProductionSummary | null = null;
      if (currentShift) {
        productionSummary = await apiResult(
          dispatch(
            catApi.endpoints.productionSummaryForShift.initiate({
              shiftId: currentShift.id,
            }),
          ),
        );
      }
      const config = await apiResult(
        dispatch(catApi.endpoints.getConfig.initiate()),
      );
      const materials = await apiResult(
        dispatch(catApi.endpoints.getMaterials.initiate()),
      );
      return {config, materials, currentShift, productionSummary};
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    siteSelected: state => {
      state.config = {};
      state.materials = [];
      state.currentShift = null;
      state.productionSummary = null;
      state.lastUpdate = null;
    },
    setCurrentRouteId: (state, action: PayloadAction<string | null>) => {
      state.currentRouteId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSiteAsyncAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSiteAsyncAction.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchSiteAsyncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload.config;
        state.materials = action.payload.materials;
        state.currentShift = action.payload.currentShift;
        state.productionSummary = action.payload.productionSummary;
        state.lastUpdate = moment.utc().valueOf();
      })
      .addCase(fetchPersonsAsyncAction.fulfilled, (state, action) => {
        state.persons = action.payload;
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const sitesReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['loading'],
  },
  typedReducer,
);

export const {actions} = slice;

export default sitesReducer;
