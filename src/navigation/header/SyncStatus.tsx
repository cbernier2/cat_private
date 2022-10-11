import React from 'react';
import {View} from 'react-native';
import CatText from '../../components/text';
import styles from './styles';
import NetworkStrengthHighSvg from 'assets/icons/edge_network_strength_high.svg';
import NoNetworkSvg from 'assets/icons/edge_no_network_connection.svg';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import useCatSelector from '../../hooks/useCatSelector';
import {networkIsConnectedSelector} from '../../redux/network-selectors';

const CatSyncStatus: React.FC = () => {
  const {t} = useTranslation();
  const lastSyncTime = new Date();
  const isConnected = useCatSelector(networkIsConnectedSelector);

  const lastSyncText = lastSyncTime
    ? format(lastSyncTime, t('status_date_format'))
    : t('status_not_available');

  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusTextContainer}>
        <CatText style={styles.statusTitle}>{t('status_last_update')}</CatText>
        <CatText style={styles.statusDate}>{lastSyncText}</CatText>
      </View>
      <View style={styles.statusIconContainer}>
        {isConnected ? (
          <NetworkStrengthHighSvg width={32} height={32} />
        ) : (
          <NoNetworkSvg width={32} height={32} />
        )}
      </View>
    </View>
  );
};

export default CatSyncStatus;
