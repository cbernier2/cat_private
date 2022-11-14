import React, {useEffect} from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';
import BackArrowSvg from 'assets/icons/edge_arrow_back_ios.svg';
import RouteSvg from 'assets/icons/route.svg';
import {TouchableOpacity, View} from 'react-native';
import {currentRouteSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import useCatDispatch from '../../hooks/useCatDispatch';
import {actions as siteActions} from '../../redux/site/site-slice';
import styles from './styles';
import CatText from '../../components/text';
import useCatTheme from '../../hooks/useCatTheme';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import {
  formatLabel,
  formatMinutesOnly,
  formatMinutesOnlyFromMillis,
  formatUnit,
} from '../../utils/format';

const RouteOverviewScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const currentRouteSummary = useCatSelector(currentRouteSelector);
  const {colors} = useCatTheme();

  useEffect(() => {
    if (!currentRouteSummary) {
      navigation.goBack();
    }
  }, [currentRouteSummary, navigation]);

  if (!currentRouteSummary) {
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
          onPress={() => dispatch(siteActions.setCurrentRouteId(null))}>
          <BackArrowSvg width={16} height={16} fill={colors.text} />
        </TouchableOpacity>
        <RouteSvg
          style={styles.titleIcon}
          width={24}
          height={24}
          fill={colors.text}
        />
        <CatText variant={'bodyLarge'} style={styles.titleText}>
          {currentRouteSummary.route.name}
        </CatText>
      </View>
      <View style={styles.productionContainer}>
        {kpiRow1}
        {kpiRow2}
      </View>
    </CatScreen>
  );
};

export default RouteOverviewScreen;
