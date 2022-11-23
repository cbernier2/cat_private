import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';
import {currentRouteSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import useCatDispatch from '../../hooks/useCatDispatch';
import {actions as siteActions} from '../../redux/site/site-slice';
import CatText from '../../components/text';
import useCatTheme from '../../hooks/useCatTheme';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import CatTextWithLabel from '../../components/text-with-label';
import {CircledIcon} from '../../components/circled-icon/Component';
import {EquipmentIconUtils, EquipmentType} from '../../api/types/cat/equipment';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
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
import {MinestarIcon} from '../../components/minestar-icon';

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

  return (
    <CatScreen title={t('route_overview_title')}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          onPress={() => dispatch(siteActions.setCurrentRouteId(null))}>
          <MinestarIcon
            name="edge_arrow_back_ios"
            size={16}
            color={colors.text}
          />
        </TouchableOpacity>
        <MinestarIcon
          name="route"
          style={styles.titleIcon}
          size={24}
          color={colors.text}
        />
        <CatText variant={'bodyLarge'} style={styles.titleText}>
          {currentRoute.name}
        </CatText>
      </View>
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
        <SummaryGraphs summary={currentRouteSummary!} />
        <CatText variant={'headlineMedium'}>{t('cat.areas')}</CatText>
        <View style={styles.cardsContainer}>
          {routeAreas.map(routeArea => (
            <CatRouteItem
              key={routeArea.summary.id}
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
              icon={
                <CircledIcon
                  size={40}
                  name={
                    EquipmentIconUtils.getIcon(
                      routeEquipment.equipment?.type ??
                        EquipmentType.HYDRAULIC_MINING_SHOVEL,
                    ) as MinestarIconName
                  }
                  iconColor={colors.grey100}
                  fillColor={colors.grey0}
                />
              }
              name={routeEquipment.equipment?.name}>
              {routeEquipment.isLoad && (
                <CatTextWithLabel label={t('cat.production_currentRate')}>
                  {formatNumber(routeEquipment.currentRateValue)}{' '}
                  {t(routeEquipment.currentRateUnit)}
                </CatTextWithLabel>
              )}
              {!routeEquipment.isLoad && (
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
