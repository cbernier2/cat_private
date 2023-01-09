import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
  Reducer,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import moment from 'moment';

import {ConfigItemName} from '../../api/types/cat/config-item';
import {Material} from '../../api/types/cat/material';
import {Shift} from '../../api/types/cat/shift';
import {CatOperatorInfo, CatPersons, SiteConfig} from '../../api/types';
import {AreaType, CategoryType, UnitType} from '../../api/types/cat/common';
import {CatHaulCycle} from '../../api/types/haul-cycle';
import {createOfflineAsyncThunk} from '../../utils/offline';
import {ObservationDO} from '../../api/types/cat/observation';
import {StopReasonTypeDO} from '../../api/types/cat/stop-reason';

import {RootState} from '../index';
import {logoutAsyncAction} from '../user/user-slice';
import {catPersistReducer} from '../utils';

import {apiResult, catApi} from './api';
import {transformConfig} from './helpers/transformConfig';
import {transformSummaries} from './helpers/transformSummaries';
import {merge} from 'lodash';

export const key = 'site';

export type MainContext = 'dashboard' | 'siteStops' | 'search';
export type CurrentArea = {id: string; type: AreaType; context?: MainContext};
export type CurrentEquipment = {
  name: string | undefined;
  category: CategoryType;
  context?: MainContext;
};
export type ProductionSummary = ReturnType<typeof transformSummaries>;

export interface SiteState {
  error: unknown | null;
  loading: boolean;
  lastUpdate: number | null;

  /**
   * The ID seems to be changing as the route gets updated so the app keeps going back to the dashboard,
   * using the name as identifier should fix it while still being unique enough
   */
  currentRouteName: string | null;
  currentArea: CurrentArea | null;
  currentEquipment: CurrentEquipment | null;
  searchRouteName: string | null;
  searchArea: CurrentArea | null;
  searchEquipment: CurrentEquipment | null;
  stopsEquipment: CurrentEquipment | null;
  persons: CatPersons;
  operatorInfo: CatOperatorInfo;

  currentShift: Shift | null;
  latestShifts: Shift[] | null;
  materials: Material[];
  stopReasonTypes: StopReasonTypeDO[];
  productionSummary: ProductionSummary | null;
  haulCycles: CatHaulCycle[];
  observations: ObservationDO[];
  siteConfig: SiteConfig;
}

const initialState: SiteState = {
  error: null,
  loading: false,
  lastUpdate: null,
  currentRouteName: null,
  currentArea: null,
  currentEquipment: null,
  persons: [],
  operatorInfo: {},
  currentShift: null,
  latestShifts: null,
  materials: [],
  stopReasonTypes: [],
  productionSummary: null,
  haulCycles: [],
  observations: [],
  searchRouteName: null,
  searchArea: null,
  searchEquipment: null,
  stopsEquipment: null,
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

export const fetchShiftDataAsyncAction = createAsyncThunk(
  `${key}/fetchShiftData`,
  async (_, {dispatch, getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;

      return await getShiftData(state.site.currentShift, dispatch);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const saveObservationOfflineAsyncAction = createOfflineAsyncThunk(
  `${key}/saveObservationOffline`,
  async (
    observation: Parameters<
      typeof catApi.endpoints.saveObservation.initiate
    >[0],
    {dispatch, rejectWithValue},
  ) => {
    try {
      await apiResult(
        dispatch(catApi.endpoints.saveObservation.initiate(observation)),
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const saveObservationAsyncAction = createAsyncThunk(
  `${key}/saveObservation`,
  async (
    observation: Parameters<
      typeof catApi.endpoints.saveObservation.initiate
    >[0],
    {dispatch},
  ) => {
    return (await dispatch(saveObservationOfflineAsyncAction(observation)))
      .payload;
  },
);

export const fetchSiteAsyncAction = createOfflineAsyncThunk(
  `${key}/fetchSite`,
  async (_, {dispatch, getState, rejectWithValue}) => {
    // No await because it is a slow query
    dispatch(fetchPersonsAsyncAction());
    const state = getState() as RootState;
    const selectedShift = state.site.currentShift;

    try {
      const siteConfig = await apiResult(
        dispatch(catApi.endpoints.getSiteConfiguration.initiate()),
      );
      const latestShifts = await apiResult(
        dispatch(catApi.endpoints.getCurrentShifts.initiate()),
      );

      const materials = await apiResult(
        dispatch(catApi.endpoints.getMaterials.initiate()),
      );

      const stopReasonTypes = await apiResult(
        dispatch(catApi.endpoints.getStopReasonTypes.initiate()),
      );

      const currentShift =
        latestShifts.find(shift => shift.id === selectedShift?.id) ??
        latestShifts[0] ??
        null;
      const shiftData = await getShiftData(currentShift, dispatch);

      return {
        currentShift,
        latestShifts,
        materials,
        siteConfig,
        stopReasonTypes,
        ...shiftData,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
  {
    offlineOptions: {
      meta: {
        dismiss: [logoutAsyncAction.pending.type],
      },
    },
  },
);

const getShiftData = async (
  shift: Shift | null,
  dispatch: ThunkDispatch<any, any, any>,
) => {
  if (!shift) {
    return {haulCycles: null, operatorInfo: null, productionSummary: null};
  }
  const params = {shiftId: shift.id};

  const productionSummary = await apiResult(
    dispatch(catApi.endpoints.productionSummaryForShift.initiate(params)),
  );

  const haulCycles = await apiResult(
    dispatch(catApi.endpoints.cyclesForShift.initiate(params)),
  );

  const operatorInfo = await apiResult(
    dispatch(catApi.endpoints.getOperatorInfo.initiate(params)),
  );

  const observations = await apiResult(
    dispatch(
      catApi.endpoints.observationsByTimeRange.initiate({
        startTime: shift.startTime,
        endTime: shift.endTime,
      }),
    ),
  );

  return {haulCycles, operatorInfo, observations, productionSummary};
};

const clearSiteData = (state: Draft<SiteState>) => {
  state.siteConfig = {};
  state.materials = [];
  state.stopReasonTypes = [];
  state.currentShift = null;
  state.productionSummary = null;
  state.observations = [];
  state.haulCycles = [];
  state.lastUpdate = null;
  state.persons = [];
  state.operatorInfo = {};
};

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    setCurrentRouteName: (
      state,
      action: PayloadAction<{
        name: string | null;
        context?: MainContext;
      } | null>,
    ) => {
      switch (action.payload?.context) {
        case 'search':
          state.searchRouteName = action.payload.name ?? null;
          break;
        default:
          state.currentRouteName = action.payload?.name ?? null;
      }
    },
    setCurrentArea: (state, action: PayloadAction<CurrentArea | null>) => {
      switch (action.payload?.context) {
        case 'search':
          state.searchArea = action.payload;
          break;
        default:
          state.currentArea = action.payload;
      }
    },
    setCurrentEquipment: (
      state,
      action: PayloadAction<SiteState['currentEquipment']>,
    ) => {
      switch (action.payload?.context) {
        case 'search':
          state.searchEquipment = action.payload;
          break;
        case 'siteStops':
          state.stopsEquipment = action.payload;
          break;
        default:
          state.currentEquipment = action.payload;
      }
    },
    selectShift: (state, action: PayloadAction<Shift>) => {
      state.currentShift = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logoutAsyncAction.pending, state => {
        clearSiteData(state);
      })
      .addCase(fetchSiteAsyncAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSiteAsyncAction.rejected, (state, action) => {
        // TODO stop app from going past site selection screen if there is no already loaded data in store?
        console.error(action);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(
        fetchSiteAsyncAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          clearSiteData(state);

          state.loading = false;
          state.error = null;
          state.lastUpdate = moment().valueOf();

          const config = transformConfig(action.payload.siteConfig);

          state.currentShift = action.payload.currentShift;
          state.latestShifts = action.payload.latestShifts;
          state.materials = action.payload.materials;
          state.stopReasonTypes = action.payload.stopReasonTypes;
          state.haulCycles = action.payload.haulCycles;
          state.observations = action.payload.observations;
          state.siteConfig = config;
          state.operatorInfo = action.payload.operatorInfo;

          state.productionSummary =
            action.payload.productionSummary &&
            transformSummaries(
              action.payload.productionSummary,
              action.payload.materials,
              config[ConfigItemName.PRODUCTION_UNIT_TYPE] as UnitType,
            );
        },
      )
      .addCase(
        fetchShiftDataAsyncAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.haulCycles = action.payload.haulCycles;
          state.observations = action.payload.observations;
          state.operatorInfo = action.payload.operatorInfo;
          state.productionSummary =
            action.payload.productionSummary &&
            transformSummaries(
              action.payload.productionSummary,
              state.materials as Material[],
              state.siteConfig[ConfigItemName.PRODUCTION_UNIT_TYPE] as UnitType,
            );
        },
      )
      .addCase(saveObservationAsyncAction.fulfilled, (state, action) => {
        const currentObservation = state.observations.find(
          observation => observation.id === action.meta.arg.id,
        );
        if (currentObservation) {
          merge(currentObservation, action.meta.arg);
        } else {
          state.observations.push(action.meta.arg as ObservationDO);
        }
      })
      .addCase(saveObservationOfflineAsyncAction.rejected, (state, action) => {
        console.error(action.payload);
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

export const {actions: siteActions} = slice;

export default sitesReducer;
