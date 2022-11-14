import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ConfigItemName} from '../../api/types/cat/config-item';
import {Material} from '../../api/types/cat/material';
import {ProductionSummary} from '../../api/types/cat/production';
import {Shift} from '../../api/types/cat/shift';
import {CatPersons, SiteConfig} from '../../api/types';
import {UnitType} from '../../api/types/cat/common';

import {apiResult, catApi} from './api';
import {transformConfig} from './helpers/transformConfig';
import {transformSummaries} from './helpers/transformSummaries';

export const key = 'site';

export interface SiteState {
  loading: boolean;
  currentRouteId: string | null;
  persons: CatPersons;
  currentShift: Shift | null;
  materials: Material[];
  productionSummary: ReturnType<typeof transformSummaries> | null;
  siteConfig: SiteConfig;
}

const initialState: SiteState = {
  loading: false,
  currentRouteId: null,
  persons: {},
  currentShift: null,
  materials: [],
  productionSummary: null,
  siteConfig: {},
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
      const siteConfig = await apiResult(
        dispatch(catApi.endpoints.getSiteConfiguration.initiate()),
      );
      const currentShift = await apiResult(
        dispatch(catApi.endpoints.getCurrentShifts.initiate()),
      );
      const materials = await apiResult(
        dispatch(catApi.endpoints.getMaterials.initiate()),
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
      return {currentShift, materials, productionSummary, siteConfig};
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
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

        const config = transformConfig(action.payload.siteConfig);

        state.currentShift = action.payload.currentShift;
        state.materials = action.payload.materials;
        state.siteConfig = config;

        state.productionSummary =
          action.payload.productionSummary &&
          transformSummaries(
            action.payload.productionSummary,
            action.payload.materials,
            config[ConfigItemName.PRODUCTION_UNIT_TYPE] as UnitType,
          );
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
