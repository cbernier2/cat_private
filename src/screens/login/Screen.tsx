import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import MineStarLogo from '../../../assets/MineStarLogo.svg';

import CatScreen from '../../components/screen';
import {CatError} from '../../components/error';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import CatTextInput from '../../components/text-input';
import useCatSelector from '../../hooks/useCatSelector';
import {
  userIsLoggingInSelector,
  userLoginErrorSelector,
  userNameSelector,
} from '../../redux/user-selectors';
import {loginAsyncAction} from '../../redux/user-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import useCatTheme from '../../hooks/useCatTheme';
import {useValidation} from '../../hooks/useValidation';

import styles from './styles';
import {LoginScreenType} from './types';
import {LoginFormType, LoginValidation} from './validation';

const LoginScreen: React.FC<LoginScreenType> = () => {
  const {t} = useTranslation();
  const theme = useCatTheme();
  const dispatch = useCatDispatch();
  const [username, setUserName] = useState<string>(
    useCatSelector(userNameSelector),
  );
  const [password, setPassword] = useState<string>('');
  const isLogin = useCatSelector(userIsLoggingInSelector);
  const loginError = useCatSelector(userLoginErrorSelector);
  const validation = useValidation<LoginFormType>(LoginValidation);

  const buttonLabel = isLogin
    ? t('cat.login_signing_in')
    : t('cat.login_sign_in');

  const login = async () => {
    const form = {password, username};
    if (validation.validate(form)) {
      Keyboard.dismiss();
      await dispatch(loginAsyncAction(form));
    }
  };

  return (
    <CatScreen title={'login'}>
      <View style={styles.container}>
        <MineStarLogo color={theme.colors.logoColor} width="100%" />

        <CatText variant="headlineMedium" style={styles.title}>
          {t('cat.login_sign_in')}
        </CatText>

        <CatError visible={Boolean(loginError)} message={loginError} />

        <CatTextInput
          label={t('cat.login_username')}
          value={username}
          onChangeText={value => setUserName(value)}
          error={validation.hasError('username')}
          errorMessage={validation.getError('username')}
        />

        <CatTextInput
          label={t('cat.login_password')}
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          style={styles.password}
          error={validation.hasError('password')}
          errorMessage={validation.getError('password')}
        />

        <CatButton disabled={isLogin} onPress={login} style={styles.submit}>
          {buttonLabel}
        </CatButton>
      </View>
    </CatScreen>
  );
};

export default LoginScreen;
