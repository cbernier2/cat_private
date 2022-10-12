import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {sleep} from '../utils/promise';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const key = 'user';

export interface UserState {
  password?: string;
  name?: string;
  authToken?: string;
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

type LoginActionType = {
  userName: string;
  password: string;
};

export const loginAsyncAction = createAsyncThunk(
  `${key}/login`,
  async (user: LoginActionType) => {
    await sleep(200);
    //const response = await fetch('https://www.google.com?' + user.userName);
    return user.userName;
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    setPasswordAction: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserNameAction: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsyncAction.pending, state => {
        state.isLogin = true;
      })
      .addCase(loginAsyncAction.rejected, state => {
        state.isLogin = false;
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.isLogin = false;
        state.name = action.meta.arg.userName;
        state.password = action.meta.arg.password;
        state.authToken = action.payload;
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const userReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['password', 'isLogin'],
  },
  typedReducer,
);

export const {setPasswordAction, setUserNameAction} = slice.actions;

export default userReducer;
