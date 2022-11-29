import React from 'react';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import CatValuesRow from '../../components/value-row';
import styles from './styles';
import {
  formatLabel,
  formatMinutesOnly,
  formatMinutesOnlyFromMillis,
  formatPercent,
  formatUnit,
} from '../../utils/format';
import {CategoryType, UNDEFINED_VALUE} from '../../api/types/cat/common';
import {ScrollView, View} from 'react-native';
import Svg, {Defs, Rect} from 'react-native-svg';
import {Pattern} from '../../components/graphs/pattern/Component';
import {getPatternId} from '../../components/graphs/pattern/functions';
import CatText from '../../components/text';
import CatCard from '../../components/card';
import CatUserBanner from '../../components/user-banner';
import {SummaryGraphs} from '../../components/summary-graphs/Component';
import useCatSelector from '../../hooks/useCatSelector';
import {currentEquipmentSelector} from '../../redux/site/site-selectors';
import {
  currentEquipmentAreaSelector,
  currentEquipmentMaterialSelector,
  currentEquipmentPersonSelector,
} from './selectors';
import {useTranslation} from 'react-i18next';

const CatEquipmentDetails = () => {
  const {t} = useTranslation();
  const currentEquipmentSummary = useCatSelector(currentEquipmentSelector);
  const currentEquipment = useCatSelector(currentEquipmentSelector);
  const person = useCatSelector(currentEquipmentPersonSelector);
  const areaSummary = useCatSelector(currentEquipmentAreaSelector);
  const material = useCatSelector(currentEquipmentMaterialSelector);

  if (!currentEquipmentSummary) {
    return null;
  }

  const kpiRowJSX = (values: CatTextWithLabelType[]) => (
    <CatValuesRow style={styles.kpiRow} values={values} />
  );

  const kpiRow1 = kpiRowJSX([
    {
      label: formatLabel(
        'cat.production_target',
        currentEquipmentSummary.targetUnit,
      ),
      children: formatUnit(currentEquipmentSummary.targetValue),
    },
    {
      label: t('cat.production_shiftToDate'),
      children: formatUnit(currentEquipmentSummary.totalValue),
    },
    {
      label: formatLabel(
        'production_projected_short',
        currentEquipmentSummary.projectedUnit,
      ),
      children: formatUnit(currentEquipmentSummary.projectedValue),
    },
  ]);

  const kpiRow2 = kpiRowJSX([
    {
      label: t('cat.production_currentRate'),
      children: formatMinutesOnly(currentEquipmentSummary.currentRateValue),
    },
    {
      label: formatLabel(
        'cat.production_secondary_total',
        currentEquipmentSummary.totalLoadsUnit,
      ),
      children: formatUnit(currentEquipmentSummary.totalLoadsValue),
    },
    {
      label: t('average_cycle_time_short'),
      children: formatMinutesOnly(currentEquipmentSummary.averageCycleTime),
    },
  ]);

  const kpiRow3 = kpiRowJSX([
    {
      label: t('cat.production_secondary_averageQueuingDurationEmpty'),
      children: formatMinutesOnlyFromMillis(
        currentEquipmentSummary.averageQueuingDurationEmpty,
      ),
    },
    {
      label: formatLabel('cat.equipment_fuelLevelPercent'),
      children: formatPercent(currentEquipmentSummary.fuelLevelPercent),
    },
    {label: '', children: ''},
  ]);

  const kpiRow4 = kpiRowJSX([
    {
      label:
        currentEquipment?.type === CategoryType.LOAD_EQUIPMENT
          ? t('cat.production_loadArea')
          : t('cat.production_dumpArea'),
      children: areaSummary?.area.name ?? UNDEFINED_VALUE,
      style: styles.card2Value,
    },
    {
      label: formatLabel('cat.production_material'),
      children: (
        <View style={styles.materialValue}>
          {material && (
            <Svg width={24} height={24}>
              <Defs>
                <Pattern
                  background={material.color}
                  pattern={material.pattern}
                  foreground={material.patternColor}
                />
              </Defs>
              <Rect
                width={'100%'}
                height={'100%'}
                rx={4}
                ry={4}
                fill={`url(#${getPatternId(
                  material.color,
                  material.pattern,
                  material.patternColor,
                )})`}
              />
            </Svg>
          )}
          <CatText variant={'titleLarge'} style={styles.materialName}>
            {material?.name ?? UNDEFINED_VALUE}
          </CatText>
        </View>
      ),
      style: styles.card2Value,
    },
  ]);

  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={styles.productionContainer}>
        <CatCard style={styles.kpiCard}>
          {kpiRow1}
          {kpiRow2}
          {kpiRow3}
        </CatCard>
        <View style={styles.card2Container}>
          <CatCard style={styles.kpiCard}>
            <View style={styles.kpiRow}>
              <CatText variant={'labelMedium'} style={styles.operatorLabel}>
                {t('cat.equipment_operator')}
              </CatText>
              <CatUserBanner person={person} />
            </View>
            {kpiRow4}
          </CatCard>
        </View>
        <View style={styles.graphContainer}>
          <SummaryGraphs summary={currentEquipmentSummary} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CatEquipmentDetails;
