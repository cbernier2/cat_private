import {createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit';
import {createOfflineAsyncThunk} from '../../utils/offline';
import {offlineActionTypes} from 'react-native-offline';
import {sleep} from '../../utils/promise';
import {darkTheme} from '../../themes/darkTheme';
import {catPersistReducer} from '../utils';
import {logoutAsyncAction} from '../user/user-slice';
import moment from 'moment/moment';

export const key = 'app';

export interface AppState {
  isThemeDark: boolean;
  theme: typeof darkTheme;
  emulateOffline: boolean;
  searchHistory: {term: string; timestamp: number}[];
}

const initialState: AppState = {
  isThemeDark: true,
  theme: darkTheme,
  emulateOffline: false,
  searchHistory: [],
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
    },
    addSearchTermToHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [
        {term: action.payload, timestamp: moment().valueOf()},
        ...state.searchHistory
          .filter(searchTerm => searchTerm.term !== action.payload)
          .slice(0, 100),
      ];
    },
    removeSearchTermFromHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        searchTerm => searchTerm.term !== action.payload,
      );
    },
    clearAllSearchTermHistory: state => {
      state.searchHistory = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(offlineActionTypes.FETCH_OFFLINE_MODE, state => {
        return state;
      })
      .addCase(logoutAsyncAction.fulfilled, state => {
        state.searchHistory = [];
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const appReducer = catPersistReducer(
  {
    key,
    blacklist: ['password', 'isLogin'],
  },
  typedReducer,
);

export const {actions: appActions} = slice;

export default appReducer;
