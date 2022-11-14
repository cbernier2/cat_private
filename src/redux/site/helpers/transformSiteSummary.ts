import {Summary} from '../../../api/types/cat/production';
import {
  getPreferredMeasurementBasis,
  toTimeData,
} from '../../../utils/production-utils';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';
import {UnitUtils} from '../../../utils/unit-utils';
import {SUMMARY_COLUMNS, TARGET_COLUMN, UnitData} from './types';

const getTimeUnitData = (summary: Summary, unitType: UnitType) => {
  switch (unitType) {
    case UnitType.LOAD:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
      };

    case UnitType.MASS:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeMass?.values ?? [],
          summary.massUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeMass?.values ?? [],
          summary.massUnit,
        ),
      };

    default:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
      };
  }
};

const getUnitData = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
): UnitData => {
  const unitType: UnitType = getPreferredMeasurementBasis(
    summary,
    materials,
    defaultUnit,
  );

  return {
    ...getTimeUnitData(summary, unitType),
    averageUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.average[unitType].unit,
    ),
    averageValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.average[unitType].key,
      SUMMARY_COLUMNS.average[unitType].unit,
    ),
    currentHourUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.currentHour[unitType].unit,
    ),
    currentHourValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.currentHour[unitType].key,
      SUMMARY_COLUMNS.currentHour[unitType].unit,
    ),
    projectedUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.projected[unitType].unit,
    ),
    projectedValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.projected[unitType].key,
      SUMMARY_COLUMNS.projected[unitType].unit,
    ),
    totalUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.total[unitType].unit,
    ),
    totalValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.total[unitType].key,
      SUMMARY_COLUMNS.total[unitType].unit,
    ),
    variationUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.variation[unitType].unit,
    ),
    variationValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.variation[unitType].key,
      SUMMARY_COLUMNS.variation[unitType].unit,
    ),
    targetUnit: UnitUtils.toDisplayUnit(summary, TARGET_COLUMN.unit),
    targetValue: UnitUtils.toDisplayValue(
      summary,
      TARGET_COLUMN.key,
      TARGET_COLUMN.unit,
    ),
    totalLoadsUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.total[UnitType.LOAD].unit,
    ),
  };
};

export const transformSiteSummary = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  // TODO replicated transformations found in the web app, but numbers don't see to match what we see in it
  //  e.g.: 527.1040744695023 volume does not change on mobile but shows 689 on web...
  const commonData = {
    cumulativeTarget: toTimeData(
      summary.cumulativeTarget?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
    cumulativeTargetMaxThreshold: toTimeData(
      summary.cumulativeTargetMaxThreshold?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
    cumulativeTargetMinThreshold: toTimeData(
      summary.cumulativeTargetMinThreshold?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
  };

  return {
    id: summary.id, // Some data we keep raw
    name: summary.name,
    totalLoadsValue: summary.totalLoads,
    averageCycleTime: summary.averageCycleTime,
    averageQueuingDurationEmpty: summary.averageQueuingDurationEmpty,
    ...commonData,
    ...getUnitData(summary, materials, defaultUnit),
    summary, // TODO still dump the whole thing for now, but we'll want to remove it latter
    // TODO add anything else that is needed for other views
  };
};

export type CatSiteSummary = ReturnType<typeof transformSiteSummary>;
