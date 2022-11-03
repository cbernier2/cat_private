import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScreenType, SummaryCell} from './types';
import {useStyles} from './styles';
import CatSummaryCard from './SummaryCard';
import HaulTruckSvg from 'assets/icons/maintenance.svg';
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
  configSelector,
  materialsSelector,
  productionSummarySelector,
} from '../../redux/site/site-selectors';
import {getPreferredMeasurementBasis} from '../../api/production';
import {ConfigItemName} from '../../api/types/cat/config-item';
import {CommonConstants} from '../../api/types/cat/common';
import {UnitUtils} from '../../utils/unit-utils';
import {summaryCells} from './constants';
import {formatMinutesOnly, formatNumber} from '../../utils/format';

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();
  const styles = useStyles();
  const config = useCatSelector(configSelector);
  const systemUnitType =
    config[ConfigItemName.PRODUCTION_UNIT_TYPE] ||
    CommonConstants.DEFAULT_UNIT_TYPE_VALUE;
  const materials = useCatSelector(materialsSelector);
  const productionSummary = useCatSelector(productionSummarySelector);
  const displaySummary = isLoad
    ? productionSummary?.siteLoadSummary
    : productionSummary?.siteSummary;
  const siteName = 'Rasmussen Valley Clone';
  const unitType = getPreferredMeasurementBasis(
    displaySummary,
    materials,
    systemUnitType,
  );

  const totalConfig = summaryCells.total[unitType];
  const projectedConfig = summaryCells.projected[unitType];
  const averageConfig = summaryCells.average[unitType];
  const targetConfig: SummaryCell = {key: 'target', unit: 'targetUnit'};

  const valuesRow1 = (
    <ValuesRow
      style={styles.productionRow}
      values={[
        {
          label:
            t('cat.production_secondary_total') +
            ' ' +
            t(UnitUtils.toDisplayUnit(displaySummary, totalConfig.unit, false)),
          children: formatNumber(
            UnitUtils.toDisplayValue(
              displaySummary,
              totalConfig.key,
              totalConfig.unit,
            ),
          ),
          isPrimary: true,
        },
        {
          label:
            t('production_projected_short') +
            ' ' +
            t(
              UnitUtils.toDisplayUnit(
                displaySummary,
                projectedConfig.unit,
                false,
              ),
            ),
          children: formatNumber(
            UnitUtils.toDisplayValue(
              displaySummary,
              projectedConfig.key,
              projectedConfig.unit,
            ),
          ),
        },
        {
          label:
            t('cat.production_target') +
            ' ' +
            t(
              UnitUtils.toDisplayUnit(
                displaySummary,
                projectedConfig.unit,
                false,
              ),
            ),
          children: formatNumber(
            UnitUtils.toDisplayValue(
              displaySummary,
              targetConfig.key,
              targetConfig.unit,
            ),
          ),
        },
      ]}
    />
  );

  const valuesRow2 = (
    <ValuesRow
      style={styles.productionRow}
      values={[
        {
          label:
            t('cat.production_secondary_total') +
            ' ' +
            t(isLoad ? 'cat.production_loads' : 'cat.production_dumps'),
          children: formatNumber(displaySummary?.totalLoads),
          isPrimary: true,
        },
        {
          label:
            t('cat.production_secondary_averageRate') +
            ' ' +
            t(
              UnitUtils.toDisplayUnit(displaySummary, averageConfig.unit, true),
            ),
          children: formatNumber(
            UnitUtils.toDisplayValue(
              displaySummary,
              averageConfig.key,
              averageConfig.unit,
            ),
          ),
        },
        {
          label: t('average_cycle_time_short'),
          children: formatMinutesOnly(displaySummary?.averageCycleTime),
        },
      ]}
    />
  );

  const getWorkAreaJSX = (attentionRequired = false) => {
    return (
      <CatSummaryCard
        hasError={attentionRequired}
        title={{
          icon: HaulTruckSvg,
          iconColor: colors.error,
          children: 'Truck 01',
        }}
        total={1000}
        projected={15000}
        target={20000}
        unit={''}
      />
    );
  };

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
        {t('summary_active_work_title', {num: 6})}
      </CatText>
      <CatActiveItemsSection title={t('summary_attention_required')}>
        <>
          {[...Array(10)].map((val, i) => (
            <View style={styles.activeProductionItem} key={i}>
              {getWorkAreaJSX(true)}
            </View>
          ))}
        </>
      </CatActiveItemsSection>
      <CatActiveItemsSection title={t('summary_active_work_areas')}>
        <>
          {[...Array(10)].map((val, i) => (
            <View style={styles.activeProductionItem} key={i}>
              {getWorkAreaJSX()}
            </View>
          ))}
        </>
      </CatActiveItemsSection>
    </CatScreen>
  );
};

export default DashboardScreen;
