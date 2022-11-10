import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Shift} from '../../api/types/cat/shift';
import {CatSiteConfig} from '../../api/types';
import {Material} from '../../api/types/cat/material';
import {ProductionSummary} from '../../api/types/cat/production';

import {apiResult, catApi} from './api';
import {transformSummaries} from './helpers/transformSummaries';

export const key = 'site';

export interface SiteState {
  loading: boolean;
  currentShift: Shift | null;
  materials: Material[] | null;
  productionSummary: ProductionSummary | null;
  siteConfig: CatSiteConfig[] | null;
}

const initialState: SiteState = {
  loading: false,
  currentShift: null,
  materials: null,
  productionSummary: null,
  siteConfig: null,
};

export const fetchSiteAsyncAction = createAsyncThunk(
  `${key}/fetchSite`,
  async (_, {dispatch, rejectWithValue}) => {
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSiteAsyncAction.fulfilled, (state, action) => {
      state.currentShift = action.payload.currentShift;
      state.materials = action.payload.materials;
      state.siteConfig = action.payload.siteConfig;

      // @ts-ignore TODO while we build our production summary type(s)
      state.productionSummary = transformSummaries(
        action.payload.productionSummary!,
        action.payload.materials,
        action.payload.siteConfig.find(
          config => (config.name = 'production.unit.type'),
        )!.value,
      );
    });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const sitesReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: [],
  },
  typedReducer,
);

export const {} = slice.actions;

export default sitesReducer;
