import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import NetworkStrengthHighSvg from 'assets/icons/edge_network_strength_high.svg';
import NetworkStrengthMediumSvg from 'assets/icons/edge_network_strength_medium.svg';
import NetworkStrengthLowSvg from 'assets/icons/edge_network_strength_low.svg';
import NetworkStrengthMinimalSvg from 'assets/icons/edge_network_strength_minimal.svg';
import NoNetworkSvg from 'assets/icons/edge_no_network_connection.svg';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import useCatSelector from '../../hooks/useCatSelector';
import {networkIsConnectedSelector} from '../../redux/network-selectors';
import {
  NetInfoStateType,
  NetInfoWifiState,
  useNetInfo,
} from '@react-native-community/netinfo';
import CatTextWithLabel from '../../components/text-with-label';
import {lastUpdateSelector} from '../../redux/site/site-selectors';
import {useBackgroundFetch} from './useBackgroundFetch';

const CatSyncStatus: React.FC = () => {
  useBackgroundFetch();

  const {t} = useTranslation();
  const netInfo = useNetInfo();
  const lastSyncTime = useCatSelector(lastUpdateSelector);
  const isConnected = useCatSelector(networkIsConnectedSelector);

  const lastSyncText = lastSyncTime
    ? format(lastSyncTime, t('status_date_format'))
    : t('status_not_available');

  const statusIcon = () => {
    if (!isConnected) {
      return NoNetworkSvg;
    } else {
      if (netInfo.type === NetInfoStateType.wifi) {
        const wifiNetInfo = netInfo as NetInfoWifiState;
        if (
          !wifiNetInfo.details.strength ||
          wifiNetInfo.details.strength > 75
        ) {
          return NetworkStrengthHighSvg;
        } else if (wifiNetInfo.details.strength > 50) {
          return NetworkStrengthMediumSvg;
        } else if (wifiNetInfo.details.strength > 25) {
          return NetworkStrengthLowSvg;
        } else {
          return NetworkStrengthMinimalSvg;
        }
      } else {
        return NetworkStrengthMinimalSvg;
      }
    }
  };

  return (
    <View style={styles.statusContainer}>
      <CatTextWithLabel
        style={styles.statusDate}
        label={t('cat.last_updated')}
        labelProps={{variant: 'labelSmall'}}>
        {lastSyncText}
      </CatTextWithLabel>
      <View style={styles.statusIconContainer}>
        {React.createElement(statusIcon(), {width: 32, height: 32})}
      </View>
    </View>
  );
};

export default CatSyncStatus;
