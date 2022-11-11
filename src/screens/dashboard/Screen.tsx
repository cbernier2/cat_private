import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import HaulTruckSvg from 'assets/icons/maintenance.svg';
import {units} from 'minestar-units';

import useCatTheme from '../../hooks/useCatTheme';
import {numberWithCommas, unitTranslateKey} from '../../utils/units';
import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatSwitch from '../../components/switch';
import CatAccordion from '../../components/accordion';
import useCatSelector from '../../hooks/useCatSelector';
import {LineChart} from '../../components/graphs/line-chart/Component';
import {
  shiftEndTimeSelector,
  shiftStartTimeSelector,
} from '../../redux/site/site-selectors';

import CatActiveItemsSection from './ActiveItemsSection';
import {ScreenType} from './types';
import {useStyles} from './styles';
import CatSummaryCard from './SummaryCard';
import ValuesRow from './ValuesRow';

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();
  const styles = useStyles();

  // TODO: Retrieve from Store / API
  const siteProductionSummary = useCatSelector(
    state => state.site.productionSummary,
  );
  // TODO get summary based on switch
  const summary = siteProductionSummary?.siteLoadSummary;

  const shiftEndTime = useSelector(shiftEndTimeSelector);
  const shiftStartTime = useSelector(shiftStartTimeSelector);
  const siteName = 'Rasmussen Valley Clone';
  const productionSummary = {
    total: siteProductionSummary?.siteLoadSummary.totalLoads,
    projected: 90000,
    target: 120000,
  };
  const unit = units.TONNE;

  const cumulativeTargetMaxThreshold = summary.cumulativeTargetMaxThreshold;
  const cumulativeTargetMinThreshold = summary.cumulativeTargetMinThreshold;
  const cumulativeTarget = summary.cumulativeTarget;
  const cumulativeValues = summary.cumulativeValues;
  const projectedCumulativeValues = summary.projectedCumulativeValues;

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
        unit={unit}
      />
    );
  };

  const firstRowJSX = () => (
    <ValuesRow
      style={styles.productionRow}
      values={[
        {
          label:
            t('cat.production_secondary_total') +
            ' ' +
            t(unitTranslateKey(unit)),
          children: numberWithCommas(productionSummary.total),
          isPrimary: true,
        },
        {
          label: t('cat.production_projected'),
          children: numberWithCommas(productionSummary.projected),
        },
        {
          label: t('cat.production_target'),
          children: numberWithCommas(productionSummary.target),
        },
      ]}
    />
  );

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
        {firstRowJSX()}
        <CatAccordion>
          <LineChart
            endTime={shiftEndTime}
            maxThreshold={cumulativeTargetMaxThreshold}
            minThreshold={cumulativeTargetMinThreshold}
            projected={projectedCumulativeValues}
            startTime={shiftStartTime}
            target={cumulativeTarget}
            values={cumulativeValues}
          />
        </CatAccordion>
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
