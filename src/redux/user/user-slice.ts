import {createAsyncThunk, createSlice, Reducer} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import * as OAuth from 'react-native-app-auth';
import {AuthorizeResult} from 'react-native-app-auth';
import {RootState} from '../index';

export const key = 'user';

export interface UserState {
  password?: string;
  auth: AuthorizeResult | null;
  isLogin: boolean;
  loginError: string | null;
}

const initialState: UserState = {
  auth: null,
  isLogin: false,
  loginError: null,
};

const authClientId = 'bdd47baa-a878-4483-8a53-6448640ad312';
const authConfig = {
  issuer:
    'https://cwslogin.b2clogin.com/cwslogin.onmicrosoft.com/B2C_1A_P1_V1_SIGNIN_NONPROD/v2.0',
  clientId: authClientId,
  redirectUrl: 'msauth.com.spiria.pitsupervisor://auth/', //'msauth.com.cat.pitsupervisor://auth',
  scopes: ['openid', 'offline_access', authClientId],
};
OAuth.prefetchConfiguration(authConfig).then().catch();

let pendingOAuthRefresh: Promise<OAuth.RefreshResult> | null = null;
export const refreshTokenAsyncAction = createAsyncThunk(
  `${key}/refreshToken`,
  async (_, {rejectWithValue, getState}) => {
    if (pendingOAuthRefresh) {
      await pendingOAuthRefresh;
      return rejectWithValue(null);
    } else {
      const refreshToken = (getState() as RootState).user.auth?.refreshToken;
      if (refreshToken) {
        try {
          pendingOAuthRefresh = OAuth.refresh(authConfig, {refreshToken});
          return await pendingOAuthRefresh;
        } catch (e) {
          return rejectWithValue(e);
        } finally {
          pendingOAuthRefresh = null;
        }
      } else {
        return rejectWithValue(null);
      }
    }
  },
);

export const loginAsyncAction = createAsyncThunk(
  `${key}/login`,
  async (_, {rejectWithValue}) => {
    try {
      return await OAuth.authorize({
        ...authConfig,
        additionalParameters: {groupsFilter: 'OMS'},
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const logoutAsyncAction = createAsyncThunk(
  `${key}/logout`,
  async (_, {rejectWithValue, getState}) => {
    try {
      const userState = (getState() as RootState).user;
      if (userState.auth) {
        return await OAuth.logout(authConfig, {
          idToken: userState.auth.idToken,
          postLogoutRedirectUrl: authConfig.redirectUrl,
        });
      }
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
    builder
      .addCase(loginAsyncAction.pending, state => {
        state.isLogin = true;
        state.loginError = null;
      })
      .addCase(loginAsyncAction.rejected, (state, action) => {
        state.isLogin = false;
        const errorCode = (action.payload as {code: string}).code;
        if (
          errorCode === 'authentication_failed' ||
          errorCode === 'registration_failed '
        ) {
          state.loginError = i18n.t('cat.login_bad_credentials_error');
        } else {
          state.loginError = i18n.t('cat.login_server_error');
        }
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.isLogin = false;
        state.auth = action.payload;
      })
      .addCase(logoutAsyncAction.pending, state => {
        state.isLogin = true;
      })
      .addCase(logoutAsyncAction.fulfilled, state => {
        state.isLogin = false;
        state.auth = null;
      })
      .addCase(logoutAsyncAction.rejected, state => {
        state.isLogin = false;
        state.auth = null;
      })
      .addCase(refreshTokenAsyncAction.fulfilled, (state, action) => {
        if (state.auth) {
          state.auth.accessToken = action.payload.accessToken;
          state.auth.accessTokenExpirationDate =
            action.payload.accessTokenExpirationDate;
        }
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

export const {actions} = slice;

export default userReducer;
