import React from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';

const SiteStopsScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();

  return <CatScreen title={t('cat.site_stops')}>{''}</CatScreen>;
};

export default SiteStopsScreen;
