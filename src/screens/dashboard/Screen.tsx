import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScreenType} from './types';
import {useStyles} from './styles';
import CatSummaryCard from './SummaryCard';
import RouteSvg from 'node_modules/minestar-icons/svg/route.svg';
import useCatTheme from '../../hooks/useCatTheme';
import ValuesRow from './ValuesRow';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatSwitch from '../../components/switch';
import CatActiveItemsSection from './ActiveItemsSection';
import CatAccordion from '../../components/accordion';
import useCatSelector from '../../hooks/useCatSelector';
import {
  materialsSelector,
  productionSummarySelector,
  systemUnitTypeSelector,
} from '../../redux/site/site-selectors';
import {getPreferredMeasurementBasis} from '../../api/production';
import {SUMMARY_COLUMNS, TARGET_COLUMN} from './constants';
import {
  formatLabel,
  formatMinutesOnly,
  formatNumber,
  formatUnit,
} from '../../utils/format';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import {isAttentionRequired} from './functions';

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();
  const styles = useStyles();
  const systemUnitType = useCatSelector(systemUnitTypeSelector);
  const materials = useCatSelector(materialsSelector);
  const productionSummary = useCatSelector(productionSummarySelector);
  const displaySummary = isLoad
    ? productionSummary?.siteLoadSummary
    : productionSummary?.siteSummary;
  const routeSummaries = productionSummary?.routeSummaries || [];
  const workSummaryCount = routeSummaries.length;
  const siteName = 'Rasmussen Valley Clone';
  const unitType = getPreferredMeasurementBasis(
    displaySummary,
    materials,
    systemUnitType,
  );
  const totalColumn = SUMMARY_COLUMNS.total[unitType];
  const projectedColumn = SUMMARY_COLUMNS.projected[unitType];
  const averageColumn = SUMMARY_COLUMNS.average[unitType];

  const valueRowJSX = (values: CatTextWithLabelType[]) => (
    <ValuesRow style={styles.productionRow} values={values} />
  );

  const valuesRow1 = valueRowJSX([
    {
      label: formatLabel(
        'cat.production_secondary_total',
        displaySummary,
        totalColumn.unit,
      ),
      children: formatUnit(displaySummary, totalColumn),
      isPrimary: true,
    },
    {
      label: formatLabel(
        'production_projected_short',
        displaySummary,
        projectedColumn.unit,
      ),
      children: formatUnit(displaySummary, projectedColumn),
    },
    {
      label: formatLabel(
        'cat.production_target',
        displaySummary,
        TARGET_COLUMN.unit,
      ),
      children: formatUnit(displaySummary, TARGET_COLUMN),
    },
  ]);

  const valuesRow2 = valueRowJSX([
    {
      label:
        t('cat.production_secondary_total') +
        ' ' +
        t(isLoad ? 'cat.production_loads' : 'cat.production_dumps'),
      children: formatNumber(displaySummary?.totalLoads),
      isPrimary: true,
    },
    {
      label: formatLabel(
        'cat.production_secondary_averageRate',
        displaySummary,
        averageColumn.unit,
      ),
      children: formatUnit(displaySummary, averageColumn),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(displaySummary?.averageCycleTime),
    },
  ]);

  const attentionNeededCardsJsx: JSX.Element[] = [];
  const activeWorkCards: JSX.Element[] = [];

  routeSummaries.forEach(routeSummary => {
    const routeUnitType = getPreferredMeasurementBasis(
      routeSummary,
      materials,
      systemUnitType,
    );
    const attentionRequired = isAttentionRequired(routeSummary, routeUnitType);
    const el = (
      <View style={styles.activeProductionItem} key={routeSummary.id}>
        <CatSummaryCard
          hasError={attentionRequired}
          title={{
            icon: RouteSvg,
            iconColor: colors.label,
            children: routeSummary.route.name,
          }}
          summary={routeSummary}
          unitType={routeUnitType}
        />
      </View>
    );
    (attentionRequired ? attentionNeededCardsJsx : activeWorkCards).push(el);
  });

  return (
    <CatScreen title={t('summary_title')}>
      <View style={styles.siteNameContainer}>
        <CatText variant={'titleMedium'}>{siteName}</CatText>
        <CatSwitch
          label={t(isLoad ? 'cat.production_loads' : 'cat.production_dumps')}
          value={isLoad}
          onValueChange={val => setIsLoad(val)}
        />
      </View>
      <View style={styles.productionContainer}>
        {valuesRow1}
        <CatAccordion>{valuesRow2}</CatAccordion>
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
