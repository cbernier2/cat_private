import React from 'react';
import {View} from 'react-native';
import CatText from '../../components/text';
import styles from './styles';
import NetworkStrengthHighSvg from 'assets/icons/edge_network_strength_high.svg';
import {useTranslation} from 'react-i18next';
import useCatSelector from '../../hooks/useCatSelector';
import {format} from 'date-fns';

const CatSyncStatus: React.FC = () => {
  const {t} = useTranslation();
  const lastSyncTime = useCatSelector(state => state.app.lastSyncTime);

  const lastSyncText = lastSyncTime
    ? format(lastSyncTime, t('m.status_date_format'))
    : t('m.status_not_available');

  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusTextContainer}>
        <CatText style={styles.statusTitle}>
          {t('m.status_last_update')}
        </CatText>
        <CatText style={styles.statusDate}>{lastSyncText}</CatText>
      </View>
      <View style={styles.statusIconContainer}>
        <NetworkStrengthHighSvg width={32} height={32} fill={'#FF0'} />
      </View>
    </View>
  );
};

export default CatSyncStatus;
