import React from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';
import {SiteStopsChart} from '../../components/graphs/site-stops/Component';

const SiteStopsScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();

  return (
    <CatScreen title={t('cat.site_stops')}>
      <SiteStopsChart />
    </CatScreen>
  );
};

export default SiteStopsScreen;
