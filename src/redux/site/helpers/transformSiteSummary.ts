import {units} from 'minestar-units';

import {Summary} from '../../../api/types/cat/production';
import {
  getPreferredMeasurementBasis,
  toStackedTimeData,
  toTimeData,
} from '../../../utils/production-utils';
import {Material} from '../../../api/types/cat/material';
import {MaterialLegend} from '../../../api/types';
import {UnitType} from '../../../api/types/cat/common';
import {UnitUtils} from '../../../utils/unit-utils';
import {Segment} from '../../../components/graphs/material-time-line/types';

import {SUMMARY_COLUMNS, TARGET_COLUMN, UnitData} from './types';

const transformMaterialQuantity = (
  materials: {[id: string]: number},
  unit: string,
): MaterialLegend[] =>
  Object.keys(materials).map(id => ({
    id,
    quantity: units.Quantity.of(materials[id], unit),
  }));

const getTimeUnitData = (summary: Summary, unitType: UnitType) => {
  switch (unitType) {
    case UnitType.LOAD:
      return {
        averageHourlyValue: UnitUtils.toLocalUnitValue(
          summary.averageLoadRate,
          summary.loadRateUnit,
        ),
        cumulativeValues: toTimeData(
          summary.cumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
        hourlyValues: toStackedTimeData(
          summary.hourlyLoads.values ?? [],
          summary.hourlyScheduledBreakLoads.values ?? [],
          summary.loadUnit,
        ),
        materialLegend: transformMaterialQuantity(
          summary.materialLoads,
          summary.loadUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
      };

    case UnitType.MASS:
      return {
        averageHourlyValue: UnitUtils.toLocalUnitValue(
          summary.averageMassRate,
          summary.massFlowRateUnit,
        ),
        cumulativeValues: toTimeData(
          summary.cumulativeMass?.values ?? [],
          summary.massUnit,
        ),
        hourlyValues: toStackedTimeData(
          summary.hourlyMass.values ?? [],
          summary.hourlyScheduledBreakMass.values ?? [],
          summary.massUnit,
        ),
        materialLegend: transformMaterialQuantity(
          summary.materialMass,
          summary.massUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeMass?.values ?? [],
          summary.massUnit,
        ),
      };

    default:
      return {
        averageHourlyValue: UnitUtils.toLocalUnitValue(
          summary.averageVolumeRate,
          summary.volumetricFlowRateUnit,
        ),
        cumulativeValues: toTimeData(
          summary.cumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
        hourlyValues: toStackedTimeData(
          summary.hourlyVolume.values ?? [],
          summary.hourlyScheduledBreakVolume.values ?? [],
          summary.volumeUnit,
        ),
        materialLegend: transformMaterialQuantity(
          summary.materialVolume,
          summary.preferredProdVolumeUnit
            ? summary.preferredProdVolumeUnit
            : summary.volumeUnit,
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
    currentRateValue: UnitUtils.toDisplayValue(
      summary,
      SUMMARY_COLUMNS.currentRate[unitType].key,
      SUMMARY_COLUMNS.currentRate[unitType].unit,
    ),
    currentRateUnit: UnitUtils.toDisplayUnit(
      summary,
      SUMMARY_COLUMNS.currentRate[unitType].unit,
    ),
  };
};

export const transformSiteSummary = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  const baseTargetUnit = summary.targetUnit
    ? UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? ''
    : '';

  let hourlyTargetData: {
    hourlyTarget?: number;
    hourlyTargetMaxThreshold?: number;
    hourlyTargetMinThreshold?: number;
  } = {};

  if (
    summary.target &&
    summary.targetUnit &&
    UnitUtils.isRate(summary.targetUnit)
  ) {
    hourlyTargetData = {
      hourlyTarget: UnitUtils.toLocalUnitValue(
        summary.target,
        summary.targetUnit,
      ),
      hourlyTargetMaxThreshold: UnitUtils.toLocalUnitValue(
        summary.targetMaxThreshold,
        summary.targetUnit,
      ),
      hourlyTargetMinThreshold: UnitUtils.toLocalUnitValue(
        summary.targetMinThreshold,
        summary.targetUnit,
      ),
    };
  }

  // TODO replicated transformations found in the web app, but numbers don't see to match what we see in it
  //  e.g.: 527.1040744695023 volume does not change on mobile but shows 689 on web...
  const commonData = {
    cumulativeTarget: toTimeData(
      summary.cumulativeTarget?.values ?? [],
      baseTargetUnit,
    ),
    cumulativeTargetMaxThreshold: toTimeData(
      summary.cumulativeTargetMaxThreshold?.values ?? [],
      baseTargetUnit,
    ),
    cumulativeTargetMinThreshold: toTimeData(
      summary.cumulativeTargetMinThreshold?.values ?? [],
      baseTargetUnit,
    ),
  };

  const materialTimeSeries: Segment[] = summary.materialTimeSeries.values
    .map(entry => ({
      time: entry.timestamp,
      value: entry.value,
    }))
    .reduce((r, timeData) => {
      if (!r.length) {
        r.push([timeData, timeData]);
        return r;
      }

      let [, last] = r[r.length - 1];
      if (timeData.value === last.value) {
        r[r.length - 1][1] = timeData; // replace the 'last' segments end timeData with the current
      } else {
        r.push([{...timeData, time: last.time}, timeData]); // start a new segment from the last segment's last time
      }

      return r;
    }, [] as Segment[]);

  return {
    id: summary.id, // Some data we keep raw
    name: summary.name,
    materialTimeSeries,
    totalLoadsValue: summary.totalLoads,
    averageCycleTime: summary.averageCycleTime,
    lastCycleTime: summary.lastCycleTime,
    averageQueuingDurationEmpty: summary.averageQueuingDurationEmpty,
    ...commonData,
    ...hourlyTargetData,
    ...getUnitData(summary, materials, defaultUnit),
    // TODO add anything else that is needed for other views
  };
};

export type CatSiteSummary = ReturnType<typeof transformSiteSummary>;
