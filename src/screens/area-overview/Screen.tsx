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

  const {t} = useTranslation();
  const summary = useSelector(currentAreaSelector);

  useEffect(() => {
    if (!summary) {
      navigation.goBack();
    }
  }, [summary, navigation]);

  if (!summary || !summary.area) {
    return null;
  }

  const iconName = summary.type === 'loadArea' ? 'load_area' : 'dump';

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel('cat.production_target', summary.targetUnit),
      children: formatUnit(summary.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: formatUnit(summary.totalValue),
    },
    {
      label: t('cat.production_projected'),
      children: formatUnit(summary.projectedValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_secondary_averageRate',
        summary.averageUnit,
      ),
      children: formatUnit(summary.averageValue),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(summary.averageCycleTime),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        summary.totalLoadsUnit,
      ),
      children: formatUnit(summary.totalLoadsValue),
    },
  ]);

  const kpiRow3 = kpiRowJSX([
    {
      label: t('cat.production_currentRate'),
      children: formatUnit(summary.currentRateValue),
    },
    {label: '', children: ''},
    {label: '', children: ''},
  ]);

  return (
    <CatScreen title={t('area_overview_title')}>
      <PageTitle icon={iconName} title={summary.area.name} />
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
        {kpiRow3}
        <SummaryGraphs summary={summary} />
      </View>
    </CatScreen>
  );
};
