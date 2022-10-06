import {createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme} from '../themes/darkTheme';

export const key = 'app';

export interface AppState {
  isThemeDark: boolean;
  theme: typeof darkTheme;
  lastSyncTime: Date;
}

const initialState: AppState = {
  isThemeDark: true,
  theme: darkTheme,
  lastSyncTime: new Date(),
};

export const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isThemeDark = !state.isThemeDark;
    },
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const appReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['password', 'isLogin', 'lastSyncTime'],
  },
  typedReducer,
);

export const {toggleTheme} = slice.actions;

export default appReducer;
