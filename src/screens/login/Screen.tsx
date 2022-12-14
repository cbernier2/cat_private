import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import MineStarLogo from '../../../assets/MineStarLogo.svg';

import CatScreen from '../../components/screen';
import {CatError} from '../../components/error';
import CatText from '../../components/text';
import CatButton from '../../components/button';

import useCatSelector from '../../hooks/useCatSelector';
import {
  userIsLoggingInSelector,
  userLoginErrorSelector,
} from '../../redux/user-selectors';
import {loginAsyncAction} from '../../redux/user-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import useCatTheme from '../../hooks/useCatTheme';

import styles from './styles';
import {LoginScreenType} from './types';

const LoginScreen: React.FC<LoginScreenType> = () => {
  const {t} = useTranslation();
  const theme = useCatTheme();
  const dispatch = useCatDispatch();
  const isLogin = useCatSelector(userIsLoggingInSelector);
  const loginError = useCatSelector(userLoginErrorSelector);

  const buttonLabel = isLogin
    ? t('cat.login_signing_in')
    : t('cat.login_sign_in');

  const login = async () => {
    await dispatch(loginAsyncAction());
  };

  return (
    <CatScreen title={'login'}>
      <View style={styles.container}>
        <MineStarLogo color={theme.colors.logoColor} width="100%" />

        <CatText variant="headlineMedium" style={styles.title}>
          {t('cat.login_sign_in')}
        </CatText>

        <CatError visible={Boolean(loginError)} message={loginError} />

        <CatButton disabled={isLogin} onPress={login} style={styles.submit}>
          {buttonLabel}
        </CatButton>
      </View>
    </CatScreen>
  );
};

export default LoginScreen;
