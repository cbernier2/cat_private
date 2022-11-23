import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import useCatTheme from '../../hooks/useCatTheme';
import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatSwitch from '../../components/switch';
import CatAccordion from '../../components/accordion';
import useCatSelector from '../../hooks/useCatSelector';
import {
  formatLabel,
  formatMinutesOnly,
  formatNumber,
  formatUnit,
} from '../../utils/format';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import {actions as siteActions} from '../../redux/site/site-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {sitesSelectedSiteSelector} from '../../redux/sites-list/sites-selectors';
import {SummaryGraphs} from '../../components/summary-graphs/Component';

import {ScreenType} from './types';
import {useStyles} from './styles';
import CatSummaryCard from './SummaryCard';
import CatActiveItemsSection from './ActiveItemsSection';
import {isAttentionRequired} from './functions';
import {activeRoutesSelector} from './selectors';

const DashboardScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();
  const styles = useStyles();
  const selectedSite = useCatSelector(sitesSelectedSiteSelector);
  const productionSummary = useCatSelector(
    state => state.site.productionSummary,
  );
  const summary = isLoad
    ? productionSummary?.siteLoadSummary
    : productionSummary?.siteSummary;
  const routeSummaries = useCatSelector(activeRoutesSelector);
  const workSummaryCount = routeSummaries.length;

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel('cat.production_secondary_total', summary?.totalUnit),
      children: formatUnit(summary?.totalValue),
      isPrimary: true,
    },
    {
      label: formatLabel('production_projected_short', summary?.projectedUnit),
      children: formatUnit(summary?.projectedValue),
    },
    {
      label: formatLabel('cat.production_target', summary?.targetUnit),
      children: formatUnit(summary?.targetValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label:
        t('cat.production_secondary_total') +
        ' ' +
        t(isLoad ? 'cat.production_loads' : 'cat.production_dumps'),
      children: formatNumber(summary?.totalLoadsValue),
      isPrimary: true,
    },
    {
      label: formatLabel(
        'cat.production_secondary_averageRate',
        summary?.averageUnit,
      ),
      children: formatUnit(summary?.averageValue),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(summary?.averageCycleTime),
    },
  ]);

  const attentionNeededCardsJsx: JSX.Element[] = [];
  const activeWorkCards: JSX.Element[] = [];

  routeSummaries.forEach(routeSummary => {
    const attentionRequired = isAttentionRequired(routeSummary);
    const el = (
      <View style={styles.activeProductionItem} key={routeSummary.id}>
        <CatSummaryCard
          hasError={attentionRequired}
          title={{
            icon: 'route',
            iconColor: colors.label,
            children: routeSummary.route.name,
          }}
          summary={routeSummary}
          onPress={() => {
            dispatch(siteActions.setCurrentRouteId(routeSummary.id));
            navigation.navigate('RouteOverview');
          }}
        />
      </View>
    );
    (attentionRequired ? attentionNeededCardsJsx : activeWorkCards).push(el);
  });

  return (
    <CatScreen title={t('summary_title')}>
      <View style={styles.siteNameContainer}>
        <CatText variant={'titleMedium'}>{selectedSite?.name}</CatText>
        <CatSwitch
          thumbColor={colors.secondary}
          trackColor={{true: colors.secondary, false: colors.secondary}}
          label={t(isLoad ? 'cat.production_loads' : 'cat.production_dumps')}
          value={isLoad}
          onValueChange={val => setIsLoad(val)}
        />
      </View>
      <View style={styles.productionContainer}>
        {kpiRow1}
        <CatAccordion>
          {kpiRow2}
          <SummaryGraphs summary={summary!} />
        </CatAccordion>
      </View>
      <CatText style={styles.activeWorkTitle} variant={'headlineSmall'}>
        {t('summary_active_work_title', {num: workSummaryCount})}
      </CatText>
      {attentionNeededCardsJsx.length > 0 && (
        <CatActiveItemsSection title={t('summary_attention_required')}>
          {attentionNeededCardsJsx}
        </CatActiveItemsSection>
      )}
      {activeWorkCards.length > 0 && (
        <CatActiveItemsSection
          title={t('summary_active_routes', {num: activeWorkCards.length})}>
          {activeWorkCards}
        </CatActiveItemsSection>
      )}
    </CatScreen>
  );
};

export default DashboardScreen;
