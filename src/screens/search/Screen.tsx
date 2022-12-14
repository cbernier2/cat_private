import React from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';

const SearchScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();

  return <CatScreen title={t('cat.button_search')}>{''}</CatScreen>;
};

export default SearchScreen;
