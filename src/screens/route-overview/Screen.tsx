import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  getRouteSelector,
  haulCyclesEquipmentSelector,
} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import CatTextWithLabel from '../../components/text-with-label';
import {CircledIcon} from '../../components/circled-icon/Component';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
import {siteActions} from '../../redux/site/site-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import CatScreen from '../../components/screen';
import {PageTitle} from '../../components/page-title/Component';
import {
  formatLabel,
  formatMinutesOnly,
  formatMinutesOnlyFromMillis,
  formatNumber,
  formatUnit,
} from '../../utils/format';

import styles from './styles';
import {ScreenType} from './types';
import {currentRouteAreasSelector, currentRouteHaulCycles} from './selectors';
import CatProductionListItem from '../../components/production-list-item';
import CatEquipmentList from '../../components/equipment-list';

const RouteOverviewScreen = (props: ScreenType) => {
  const {navigation} = props;
  const context = props.route.params?.context;
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const routeSelector = getRouteSelector(context);
  const selectedRouteSummary = useCatSelector(routeSelector);
  const selectedRoute = selectedRouteSummary?.route;
  const routeAreas = useCatSelector(state =>
    currentRouteAreasSelector(state, selectedRouteSummary),
  );
  const routeEquipments = useCatSelector(state =>
    haulCyclesEquipmentSelector(
      state,
      currentRouteHaulCycles(state, selectedRouteSummary),
    ),
  );

  useEffect(() => {
    if (!selectedRouteSummary) {
      navigation.goBack();
    }
  }, [selectedRouteSummary, navigation]);

  if (!selectedRouteSummary || !selectedRoute) {
    return null;
  }

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_target',
        selectedRouteSummary.targetUnit,
      ),
      children: formatUnit(selectedRouteSummary.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: formatUnit(selectedRouteSummary.totalValue),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        selectedRouteSummary.totalLoadsUnit,
      ),
      children: formatUnit(selectedRouteSummary.totalLoadsValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(selectedRouteSummary.averageCycleTime),
    },
    {
      label: t('cat.production_secondary_averageQueuingDurationEmpty'),
      children: formatMinutesOnlyFromMillis(
        selectedRouteSummary.averageQueuingDurationEmpty,
      ),
    },
    {label: '', children: ''},
  ]);

  const navigateToArea = (area: typeof routeAreas[number]) => {
    dispatch(
      siteActions.setCurrentArea({
        id: area.summary.id,
        type: area.summary.type,
        context,
      }),
    );
    navigation.navigate('AreaDetails');
  };

  return (
    <CatScreen title={t('route_overview_title')}>
      <PageTitle icon={'route'} title={selectedRoute.name} />
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
        <SummaryGraphs summary={selectedRouteSummary} />
        <CatText variant={'headlineMedium'}>{t('cat.areas')}</CatText>
        <View style={styles.cardsContainer}>
          {routeAreas.map((routeArea, i) => (
            <CatProductionListItem
              key={`r${i}`}
              onPress={() => navigateToArea(routeArea)}
              name={routeArea.name}
              icon={<CircledIcon size={40} name={routeArea.icon} />}>
              <CatTextWithLabel label={t('cat.production_currentRate')}>
                {formatNumber(routeArea.summary.currentRateValue)}{' '}
                {t(routeArea.summary.currentRateUnit)}
              </CatTextWithLabel>
            </CatProductionListItem>
          ))}
        </View>
        <CatEquipmentList equipment={routeEquipments} context={context} />
      </View>
    </CatScreen>
  );
};

export default RouteOverviewScreen;
