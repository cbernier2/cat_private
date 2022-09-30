import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createOfflineAsyncThunk} from '../utils/offline';
import {offlineActionTypes} from 'react-native-offline';
import {sleep} from '../utils/promise';

export const key = 'app';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

export const offlineCancelTest = createAsyncThunk(
  `${key}/offlineCancelTest`,
  async () => {
    console.log('CANCEL!');
    return 'CANCEL!';
  },
);

export const offlineQueueTest = createOfflineAsyncThunk(
  `${key}/offlineQueueTest`,
  async () => {
    await sleep(100);
    console.log('QUEUED?');
    return 'QUEUED?';
  },
  {
    offlineOptions: {
      meta: {
        dismiss: [`${key}/offlineCancelTest`],
      },
    },
  },
);

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(offlineActionTypes.FETCH_OFFLINE_MODE, (state, action) => {
        console.log(JSON.stringify(state), JSON.stringify(action));
        return state;
      })
      .addCase('app/offlineQueueTest', (state) => {
        console.log('QUEUED?');
        return state;
      })
      .addCase('app/offlineCancelTest', (state) => {
        console.log('CANCEL!');
        return state;
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const appReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['password', 'isLogin'],
  },
  typedReducer,
);

export const {increment, decrement, incrementByAmount} = slice.actions;

export default appReducer;
