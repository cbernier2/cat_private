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
import moment from 'moment';
import {CatHaulCycle} from '../../api/types/haul-cycle';

export const key = 'site';

export interface SiteState {
  loading: boolean;
  lastUpdate: number | null;
  currentRouteId: string | null;
  persons: CatPersons;
  currentShift: Shift | null;
  materials: Material[];
  productionSummary: ReturnType<typeof transformSummaries> | null;
  haulCycles: CatHaulCycle[];
  siteConfig: SiteConfig;
}

const initialState: SiteState = {
  loading: false,
  lastUpdate: null,
  currentRouteId: null,
  persons: {},
  currentShift: null,
  materials: [],
  productionSummary: null,
  haulCycles: [],
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
      const haulCycles = await apiResult(
        dispatch(
          catApi.endpoints.cyclesForShift.initiate({
            shiftId: currentShift.id,
          }),
        ),
      );
      return {
        currentShift,
        materials,
        productionSummary,
        haulCycles,
        siteConfig,
      };
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
      state.siteConfig = {};
      state.materials = [];
      state.currentShift = null;
      state.productionSummary = null;
      state.haulCycles = [];
      state.lastUpdate = null;
      state.persons = {};
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
      .addCase(fetchSiteAsyncAction.rejected, (state, action) => {
        // TODO stop app from going past site selection screen if there is no already loaded data in store
        console.error(action);
        state.loading = false;
      })
      .addCase(fetchSiteAsyncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdate = moment().valueOf();

        const config = transformConfig(action.payload.siteConfig);

        state.currentShift = action.payload.currentShift;
        state.materials = action.payload.materials;
        state.haulCycles = action.payload.haulCycles;
        state.siteConfig = config;

        state.productionSummary =
          action.payload.productionSummary &&
          transformSummaries(
            action.payload.productionSummary,
            action.payload.materials,
            config[ConfigItemName.PRODUCTION_UNIT_TYPE] as UnitType,
          );
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
