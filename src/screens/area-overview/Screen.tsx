import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {
  currentAreaSelector,
  haulCyclesEquipmentSelector,
  searchAreaSelector,
} from '../../redux/site/site-selectors';
import CatScreen from '../../components/screen';
import {PageTitle} from '../../components/page-title/Component';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
import {
  formatLabel,
  formatMinutesOnly,
  formatRelativeTime,
  formatUnit,
} from '../../utils/format';

import {ScreenType} from './types';
import {styles} from './styles';
import CatValueWithUnit from '../../components/value-with-unit';
import CatCard from '../../components/card';
import useCatSelector from '../../hooks/useCatSelector';
import {areaHaulCyclesSelector, areaMaterialSelector} from './selectors';
import CatEquipmentList from '../../components/equipment-list';
import MaterialSample from '../../components/material-sample';
import CatText from '../../components/text';
import {UNDEFINED_VALUE} from '../../api/types/cat/common';

export const AreaOverviewScreen = (props: ScreenType) => {
  const {navigation} = props;
  const isSearch = Boolean(props.route.params?.search);

  const {t} = useTranslation();
  const areaSelector = isSearch ? searchAreaSelector : currentAreaSelector;
  const selectedArea = useSelector(areaSelector);
  const areasEquipments = useCatSelector(state =>
    haulCyclesEquipmentSelector(
      state,
      areaHaulCyclesSelector(state, selectedArea),
    ),
  );
  const areaMaterial = useCatSelector(state =>
    areaMaterialSelector(state, selectedArea),
  );

  useEffect(() => {
    if (!selectedArea) {
      navigation.goBack();
    }
  }, [selectedArea, navigation]);

  if (!selectedArea || !selectedArea.area) {
    return null;
  }

  const iconName = selectedArea.type === 'loadArea' ? 'load_area' : 'dump';

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel('cat.production_target', selectedArea.targetUnit),
      children: formatUnit(selectedArea.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: (
        <CatValueWithUnit
          value={formatUnit(selectedArea.totalValue)}
          unit={t(selectedArea.totalUnit)}
        />
      ),
    },
    {
      label: formatLabel(
        'production_projected_short',
        selectedArea.projectedUnit,
      ),
      children: formatUnit(selectedArea.projectedValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_secondary_averageRate',
        selectedArea.averageUnit,
      ),
      children: formatUnit(selectedArea.averageValue),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(selectedArea.averageCycleTime),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        selectedArea.totalLoadsUnit,
      ),
      children: formatUnit(selectedArea.totalLoadsValue),
    },
  ]);

  const kpiRow3 = kpiRowJSX([
    {
      label: t('cat.production_currentRate'),
      children: (
        <CatValueWithUnit
          value={formatUnit(selectedArea.currentRateValue)}
          unit={t(selectedArea.currentRateUnit)}
        />
      ),
    },
    {label: '', children: ''},
    {label: '', children: ''},
  ]);

  const kpiRow4 = kpiRowJSX([
    {
      label: t('cat.production_lastCycleTime'),
      children: formatRelativeTime(selectedArea.lastCycleTime),
    },
    {
      label: formatLabel('cat.production_material'),
      children: (
        <View style={styles.materialValue}>
          {areaMaterial && <MaterialSample material={areaMaterial} size={24} />}
          <CatText variant={'titleLarge'} style={styles.materialName}>
            {areaMaterial?.name ?? UNDEFINED_VALUE}
          </CatText>
        </View>
      ),
    },
  ]);

  return (
    <CatScreen title={t('area_overview_title')}>
      <PageTitle icon={iconName} title={selectedArea.area.name} />
      <View style={styles.kpiContainer}>
        <CatCard style={styles.kpiCard}>
          {kpiRow1}
          {kpiRow2}
          {kpiRow3}
        </CatCard>
        <CatCard style={styles.kpiCard}>{kpiRow4}</CatCard>
      </View>
      <View style={styles.productionContainer}>
        <SummaryGraphs summary={selectedArea} />
        <CatEquipmentList equipment={areasEquipments} isSearch={isSearch} />
      </View>
    </CatScreen>
  );
};
