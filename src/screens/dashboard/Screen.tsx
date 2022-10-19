import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';

import {ScreenType} from './types';
import CatText from '../../components/text';
import {View} from 'react-native';
import styles from './styles';
import CatSwitch from '../../components/switch';

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [loads, setLoads] = useState(false);

  // TODO: Retrieve from Store / API
  const siteName = 'Rasmussen Valley Clone';

  return (
    <CatScreen title={t('summary_title')}>
      <View style={styles.siteNameContainer}>
        <CatText variant={'titleMedium'}>{siteName}</CatText>
        <CatSwitch
          label={t('cat.general_loads')}
          value={loads}
          onValueChange={val => setLoads(val)}
        />
      </View>
    </CatScreen>
  );
};

export default DashboardScreen;
