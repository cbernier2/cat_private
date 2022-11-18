import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import useCatSelector from '../../hooks/useCatSelector';
import {useNetInfo} from '@react-native-community/netinfo';
import CatTextWithLabel from '../../components/text-with-label';
import {lastUpdateSelector} from '../../redux/site/site-selectors';
import useCatTheme from '../../hooks/useCatTheme';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {MinestarIcon} from '../../components/minestar-icon';
import {fetchSiteIfNeededAsyncAction} from '../../redux/site/background-fetch';
import useCatDispatch from '../../hooks/useCatDispatch';

const CatSyncStatus: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const isConnected = useNetInfo().isConnected;
  const lastSyncTime = useCatSelector(lastUpdateSelector);
  const {colors} = useCatTheme();
  const networkError = useCatSelector(state => state.site.error);

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchSiteIfNeededAsyncAction());
    }
  }, [dispatch, isConnected]);

  const lastSyncText = lastSyncTime
    ? format(lastSyncTime, t('status_date_format'))
    : t('status_not_available');

  let iconColor = colors.secondary;
  let iconName: MinestarIconName = 'edge_network_strength_high';
  if (isConnected === false) {
    iconColor = colors.errorWarning0;
    iconName = 'edge_no_network_connection';
  } else if (networkError !== null) {
    iconColor = colors.errorCaution0;
    iconName = 'edge_hotspot_error';
  }

  return (
    <View style={styles.statusContainer}>
      <CatTextWithLabel
        style={styles.statusDate}
        label={t('cat.last_updated')}
        labelProps={{variant: 'labelSmall'}}>
        {lastSyncText}
      </CatTextWithLabel>
      <View style={styles.statusIconContainer}>
        <MinestarIcon name={iconName} color={iconColor} size={32} />
      </View>
    </View>
  );
};

export default CatSyncStatus;
