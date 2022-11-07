import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

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
  (state: RootState) => state.user.name,
  name => name || '',
);
