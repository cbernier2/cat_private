import {createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createOfflineAsyncThunk} from '../utils/offline';
import {offlineActionTypes} from 'react-native-offline';
import {sleep} from '../utils/promise';
import {darkTheme} from '../themes/darkTheme';

export const key = 'app';

export interface AppState {
  isThemeDark: boolean;
  theme: typeof darkTheme;
  emulateOffline: boolean;
}

const initialState: AppState = {
  isThemeDark: true,
  theme: darkTheme,
  emulateOffline: false,
};

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
  name: key,
  initialState,
  reducers: {
    offlineCancelTest: state => {
      console.log('CANCEL!');
      return state;
    },
    toggleTheme: state => {
      state.isThemeDark = !state.isThemeDark;
    },
    toggleOffline: state => {
      state.emulateOffline = !state.emulateOffline;
    }
  },
  extraReducers: builder => {
    builder.addCase(offlineActionTypes.FETCH_OFFLINE_MODE, state => {
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

export const {offlineCancelTest, toggleOffline, toggleTheme} = slice.actions;

export default appReducer;
