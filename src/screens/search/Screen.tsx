import React from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';

const Screen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();

  return <CatScreen title={t('search_title')}>{''}</CatScreen>;
};

export default Screen;
