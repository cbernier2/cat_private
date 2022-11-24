import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {currentRouteSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import useCatTheme from '../../hooks/useCatTheme';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import CatTextWithLabel from '../../components/text-with-label';
import {CircledIcon} from '../../components/circled-icon/Component';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
import {actions as siteActions} from '../../redux/site/site-slice';
import {
  formatLabel,
  formatMinutesOnly,
  formatMinutesOnlyFromMillis,
  formatNumber,
  formatUnit,
} from '../../utils/format';

import styles from './styles';
import {ScreenType} from './types';
import CatRouteItem from './RouteItem';
import {
  currentRouteAreasSelector,
  currentRouteEquipmentsSelector,
} from './selectors';
import useCatDispatch from '../../hooks/useCatDispatch';
import {getEquipmentIcon} from '../../api/types/equipment';
import {CategoryType} from '../../api/types/cat/common';
import CatScreen from '../../components/screen';
import {PageTitle} from '../../components/page-title/Component';

const RouteOverviewScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const currentRouteSummary = useCatSelector(currentRouteSelector);
  const currentRoute = currentRouteSummary?.route;
  const routeAreas = useCatSelector(currentRouteAreasSelector);
  const routeEquipments = useCatSelector(currentRouteEquipmentsSelector);
  const {colors} = useCatTheme();

  useEffect(() => {
    if (!currentRouteSummary) {
      navigation.goBack();
    }
  }, [currentRouteSummary, navigation]);

  if (!currentRouteSummary || !currentRoute) {
    return null;
  }

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_target',
        currentRouteSummary.targetUnit,
      ),
      children: formatUnit(currentRouteSummary.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: formatUnit(currentRouteSummary.totalValue),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        currentRouteSummary.totalLoadsUnit,
      ),
      children: formatUnit(currentRouteSummary.totalLoadsValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(currentRouteSummary.averageCycleTime),
    },
    {
      label: t('cat.production_secondary_averageQueuingDurationEmpty'),
      children: formatMinutesOnlyFromMillis(
        currentRouteSummary.averageQueuingDurationEmpty,
      ),
    },
    {label: '', children: ''},
  ]);

  const navigateToArea = (area: any) => {
    dispatch(
      siteActions.setCurrentArea({
        id: area.summary.id,
        type: area.summary.type,
      }),
    );
    navigation.navigate('AreaDetails');
  };

  return (
    <CatScreen title={t('route_overview_title')}>
      <PageTitle icon={'route'} title={currentRoute.name} />
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
        <SummaryGraphs summary={currentRouteSummary!} />
        <CatText variant={'headlineMedium'}>{t('cat.areas')}</CatText>
        <View style={styles.cardsContainer}>
          {routeAreas.map(routeArea => (
            <CatRouteItem
              key={routeArea.summary.id}
              onPress={() => navigateToArea(routeArea)}
              name={routeArea.name}
              icon={
                <CircledIcon
                  size={40}
                  name={routeArea.icon}
                  iconColor={colors.grey100}
                  fillColor={colors.grey0}
                />
              }>
              <CatTextWithLabel label={t('cat.production_currentRate')}>
                {formatNumber(routeArea.summary.currentRateValue)}{' '}
                {t(routeArea.summary.currentRateUnit)}
              </CatTextWithLabel>
            </CatRouteItem>
          ))}
        </View>
        <CatText variant={'headlineMedium'} style={styles.equipTitle}>
          {t('route_equipment', {num: routeEquipments.length})}
        </CatText>
        <View style={styles.cardsContainer}>
          {routeEquipments.map(routeEquipment => (
            <CatRouteItem
              key={routeEquipment.id}
              onPress={() => {
                dispatch(
                  siteActions.setCurrentEquipment({
                    name: routeEquipment.equipment?.name,
                    category: routeEquipment.categoryType,
                  }),
                );
                navigation.navigate('EquipmentDetails');
              }}
              icon={
                <CircledIcon
                  size={40}
                  name={getEquipmentIcon(
                    routeEquipment.equipment,
                    routeEquipment.categoryType,
                  )}
                  iconColor={colors.grey100}
                  fillColor={colors.grey0}
                />
              }
              name={routeEquipment.equipment?.name}>
              {routeEquipment.categoryType === CategoryType.LOAD_EQUIPMENT && (
                <CatTextWithLabel label={t('cat.production_currentRate')}>
                  {formatNumber(routeEquipment.currentRateValue)}{' '}
                  {t(routeEquipment.currentRateUnit)}
                </CatTextWithLabel>
              )}
              {routeEquipment.categoryType === CategoryType.HAUL_EQUIPMENT && (
                <CatTextWithLabel label={t('cat.average_cycle_time')}>
                  {formatMinutesOnly(routeEquipment.averageCycleTime)}
                </CatTextWithLabel>
              )}
            </CatRouteItem>
          ))}
        </View>
      </View>
    </CatScreen>
  );
};

export default RouteOverviewScreen;
