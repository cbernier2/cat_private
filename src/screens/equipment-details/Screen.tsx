import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {currentEquipmentSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import {
  formatLabel,
  formatMinutesOnly,
  formatMinutesOnlyFromMillis,
  formatUnit,
} from '../../utils/format';

import styles from './styles';
import {ScreenType} from './types';
import CatCard from '../../components/card';
import {getEquipmentIcon} from '../../api/types/equipment';
import {PageTitle} from '../../components/page-title/Component';
import CatScreen from '../../components/screen';

const EquipmentDetailsScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const currentEquipmentSummary = useCatSelector(currentEquipmentSelector);

  useEffect(() => {
    if (!currentEquipmentSummary) {
      navigation.goBack();
    }
  }, [currentEquipmentSummary, navigation]);

  if (!currentEquipmentSummary) {
    return null;
  }

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_target',
        currentEquipmentSummary.targetUnit,
      ),
      children: formatUnit(currentEquipmentSummary.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: formatUnit(currentEquipmentSummary.totalValue),
    },
    {
      label: formatLabel(
        'production_projected_short',
        currentEquipmentSummary.projectedUnit,
      ),
      children: formatUnit(currentEquipmentSummary.projectedValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: t('cat.production_currentRate'),
      children: formatMinutesOnly(currentEquipmentSummary.currentRateValue),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        currentEquipmentSummary.totalLoadsUnit,
      ),
      children: formatUnit(currentEquipmentSummary.totalLoadsValue),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(currentEquipmentSummary.averageCycleTime),
    },
  ]);

  const kpiRow3 = kpiRowJSX([
    {
      label: t('cat.production_secondary_averageQueuingDurationEmpty'),
      children: formatMinutesOnlyFromMillis(
        currentEquipmentSummary.averageQueuingDurationEmpty,
      ),
    },
    {
      label: formatLabel('cat.equipment_fuelLevelPercent'),
      children: formatUnit(currentEquipmentSummary.fuelLevelPercent),
    },
    {label: '', children: ''},
  ]);

  return (
    <CatScreen title={t('equipment_details_title')}>
      <PageTitle
        icon={getEquipmentIcon(
          currentEquipmentSummary.equipment,
          currentEquipmentSummary.categoryType,
        )}
        title={currentEquipmentSummary.equipment?.name}
      />
      <View style={styles.productionContainer}>
        <CatCard style={styles.kpiCard}>
          {kpiRow1}
          {kpiRow2}
          {kpiRow3}
        </CatCard>
      </View>
    </CatScreen>
  );
};

export default EquipmentDetailsScreen;
