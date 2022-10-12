import React from 'react';
import CatScreen from '../../components/screen';
import {SiteStopsScreenType} from './types';
import {useTranslation} from 'react-i18next';

const LoginScreen: React.FC<SiteStopsScreenType> = () => {
  const {t} = useTranslation();

  return <CatScreen title={t('search_title')}>{''}</CatScreen>;
};

export default LoginScreen;
