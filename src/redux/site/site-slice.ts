import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiResult, catApi} from './api';
import {Shift} from '../../api/types/cat/shift';
import {ProductionSummary} from '../../api/types/cat/production';
import {findMostRecentShift} from '../../api/shift';

export const key = 'site';

export interface SiteState {
  loading: boolean;
  currentShift: Shift | null;
  productionSummary: ProductionSummary | null;
}

const initialState: SiteState = {
  loading: false,
  currentShift: null,
  productionSummary: null,
};

export const fetchSiteAsyncAction = createAsyncThunk(
  `${key}/fetchSite`,
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const shifts = await apiResult(
        dispatch(catApi.endpoints.getShifts.initiate()),
      );
      const currentShift = findMostRecentShift(shifts);
      let productionSummary: ProductionSummary | null = null;
      if (currentShift) {
        const productionSummaries = await apiResult(
          dispatch(
            catApi.endpoints.productionSummaryForShift.initiate({
              shiftId: currentShift.id,
            }),
          ),
        );
        if (productionSummaries.length > 0) {
          productionSummary = productionSummaries[0];
        }
      }
      return {currentShift, productionSummary};
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
      state.productionSummary = action.payload.productionSummary;
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
