import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {currentAreaSelector} from '../../redux/site/site-selectors';
import CatScreen from '../../components/screen';
import {PageTitle} from '../../components/page-title/Component';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
import {formatLabel, formatMinutesOnly, formatUnit} from '../../utils/format';

import {ScreenType} from './types';
import {styles} from './styles';

export const AreaOverviewScreen = (props: ScreenType) => {
  const {navigation} = props;
  const isSearch = Boolean(props.route.params?.search);

  const {t} = useTranslation();
  const selectedArea = useSelector(currentAreaSelector(isSearch));

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
      children: formatUnit(selectedArea.totalValue),
    },
    {
      label: t('cat.production_projected'),
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
      children: formatUnit(selectedArea.currentRateValue),
    },
    {label: '', children: ''},
    {label: '', children: ''},
  ]);

  return (
    <CatScreen title={t('area_overview_title')}>
      <PageTitle icon={iconName} title={selectedArea.area.name} />
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
        {kpiRow3}
        <SummaryGraphs summary={selectedArea} />
      </View>
    </CatScreen>
  );
};
