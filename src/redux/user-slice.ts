import {Buffer} from 'buffer';
import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

export const key = 'user';

export interface UserState {
  password?: string;
  name?: string;
  authToken: string | null;
  isLogin: boolean;
  loginError: string | null;
}

const initialState: UserState = {
  authToken: null,
  isLogin: false,
  loginError: null,
};

export type LoginActionType = {
  username: string;
  password: string;
};

export const loginAsyncAction = createAsyncThunk(
  `${key}/login`,
  async (user: LoginActionType, {rejectWithValue}) => {
    // TODO: Remove temporary "successful" login user
    if (user.username.toLowerCase() === 'letmein') {
      return true;
    }

    try {
      const response = await fetch(
        'http://cluster04.centralus.cloudapp.azure.com/uaa/oauth/token',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              'dev:dev-secret',
              'binary',
            ).toString('base64')}`,
          },
          body: `grant_type=password&username=${user.username}&password=${user.password}`,
        },
      );

      const body = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(body);
      }
      return body;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const slice = createSlice({
  name: key,
  initialState,
  reducers: {
    logout: state => {
      // TODO: this will probably need to do other things in the future
      state.authToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsyncAction.pending, state => {
        state.isLogin = true;
        state.loginError = null;
      })
      .addCase(loginAsyncAction.rejected, (state, action) => {
        state.isLogin = false;
        // @ts-ignore
        if (action.payload.error === 'invalid_grant') {
          state.loginError = i18n.t('cat.login_bad_credentials_error');
        } else {
          state.loginError = i18n.t('cat.login_server_error');
        }
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.isLogin = false;
        state.name = action.meta.arg.username;
        state.password = action.meta.arg.password;
        state.authToken = 'yay';
      });
  },
});

const typedReducer: Reducer<typeof initialState> = slice.reducer;
const userReducer = persistReducer(
  {
    key,
    storage: AsyncStorage,
    blacklist: ['password', 'isLogin', 'loginError', 'selectedSite'],
  },
  typedReducer,
);

export const {logout} = slice.actions;

export default userReducer;
