import {createSlice, Reducer} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {key} from './user-slice';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

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
