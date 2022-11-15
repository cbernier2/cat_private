import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import jwtDecode from 'jwt-decode';
import {AccessTokenPayload} from '../../api/types/oauth';

export const userAuthTokenSelector = createSelector(
  (state: RootState) => state.user.auth?.accessToken,
  accessToken => accessToken || null,
);

export const userIsLoggingInSelector = createSelector(
  (state: RootState) => state.user.isLogin,
  islogin => islogin,
);

export const userLoginErrorSelector = createSelector(
  (state: RootState) => state.user.loginError,
  loginError => loginError,
);

export const userNameSelector = createSelector(
  (state: RootState) => state.user.auth,
  auth => {
    if (auth) {
      return (jwtDecode(auth.accessToken) as AccessTokenPayload).catloginid;
    } else {
      return 'unknown';
    }
  },
);
