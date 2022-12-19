import React from 'react';
import {View} from 'react-native';
import {CatEquipmentListType} from './types';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import CatText from '../text';
import {CatEquipmentIcon} from '../equipment-icon';
import {CategoryType} from '../../api/types/cat/common';
import CatTextWithLabel from '../text-with-label';
import {formatMinutesOnly, formatNumber} from '../../utils/format';
import {siteActions} from '../../redux/site/site-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {useNavigation} from '@react-navigation/native';
import CatProductionListItem from '../production-list-item';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

const CatEquipmentList: React.FC<CatEquipmentListType> = ({
  equipment,
  isSearch,
}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const navigation = useNavigation<MaterialBottomTabNavigationProp<any>>();

  const navigateToEquipment = (routeEquipment: typeof equipment[number]) => {
    dispatch(
      siteActions.setCurrentEquipment({
        name: routeEquipment.equipment?.name,
        category: routeEquipment.type,
        isSearch,
      }),
    );
    navigation.navigate('EquipmentDetails');
  };

  return (
    <>
      <CatText variant={'headlineMedium'} style={styles.equipTitle}>
        {t('route_equipment', {num: equipment.length})}
      </CatText>
      <View style={styles.cardsContainer}>
        {equipment.map((routeEquipment, i) => (
          <CatProductionListItem
            key={`e${i}`}
            onPress={() => navigateToEquipment(routeEquipment)}
            icon={
              <CatEquipmentIcon
                equipmentSummary={routeEquipment}
                type={routeEquipment.categoryType}
              />
            }
            name={routeEquipment.equipment?.name}>
            {routeEquipment.type === CategoryType.LOAD_EQUIPMENT && (
              <CatTextWithLabel label={t('cat.production_currentRate')}>
                {formatNumber(routeEquipment.currentRateValue)}{' '}
                {t(routeEquipment.currentRateUnit)}
              </CatTextWithLabel>
            )}
            {routeEquipment.type === CategoryType.HAUL_EQUIPMENT && (
              <CatTextWithLabel label={t('cat.average_cycle_time')}>
                {formatMinutesOnly(routeEquipment.averageCycleTime)}
              </CatTextWithLabel>
            )}
          </CatProductionListItem>
        ))}
      </View>
    </>
  );
};

export default CatEquipmentList;
