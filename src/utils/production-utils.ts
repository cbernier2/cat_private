import {units} from 'minestar-units';

import {CategoryType, UnitType} from '../api/types/cat/common';
import {Material} from '../api/types/cat/material';
import {TimeData} from '../components/graphs/types';

import {ArrayUtils} from './array-utils';
import {UnitUtils} from './unit-utils';

/**
 * Sourced
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/production/production.service.ts#L623
 * Edited for lint/prettier fixes and some @ts-ignores
 *
 * Determine the preferred measurement basis for the given production summary. If all materials
 * contained in the production summary have the same preferred measurement basis, use that value
 * instead of the default measurement basis unit defined for the system.
 */
export function getPreferredMeasurementBasis(
  summary: any,
  materials: Material[],
  defaultUnitType: UnitType,
): UnitType {
  if (!summary || !materials) {
    return defaultUnitType;
  }

  // Use the target unit if the summary has a target
  if (summary.target && summary.targetUnit) {
    // @ts-ignore
    return UnitUtils.toUnitType(units.Unit.of(summary.targetUnit).quantityType);
  }

  if (summary['@type'] === CategoryType.MATERIAL) {
    // The summary is a material production summary, so use the preferred measurement basis of the material being summarised
    // @ts-ignore
    let material: Material = materials.find(
      (materialItem: Material) => materialItem.id === summary.id,
    );
    if (material && material.preferredMeasurementBasis) {
      return material.preferredMeasurementBasis;
    }
  }

  // Check if all materials contained in the production summary have the same preferred measurement basis.
  // If so, use that value instead of the default measurement basis unit defined for the system.
  if (summary.materialLoads) {
    // Get the materials from the materialLoads property, and determine the preferred measurement
    // basis values for the materials.
    let distinctTypes: UnitType[] = ArrayUtils.toDistinctArray(
      Object.keys(summary.materialLoads)
        .map((materialId: string) =>
          materials.find((material: Material) => material.id === materialId),
        )
        // @ts-ignore
        .map((material: Material) => {
          if (material && material.preferredMeasurementBasis) {
            // Material has a preferred measurement basis.  Use it
            return material.preferredMeasurementBasis;
          } else {
            // Material either does not exist or does not have a preferred measurement basis.
            // Use the default
            return defaultUnitType;
          }
        }),
    );

    if (distinctTypes.length === 1) {
      // All materials have the same preferred measurement basis.  Use it
      return distinctTypes[0];
    }
  }

  return defaultUnitType;
}

/**
 * Sourced
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/production/production.service.ts#L265
 */
export function toTimeData(values: any[], unit: string): TimeData[] {
  let result = [];
  for (let entry of values) {
    result.push({
      time: entry.timestamp,
      value: UnitUtils.toLocalUnitValue(entry.value, unit),
    });
  }
  return result;
}
/**
 * Sourced
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/production/production.service.ts#L276
 */
export function toStackedTimeData(
  timeSeries1: any[],
  timeSeries2: any[],
  unit: string,
  isCompareTimeSeries: boolean = true,
): TimeData[] {
  /** isCompareTimeSeries defined whether to compare the timeseries1 and timeseries2 arrays
   * For water truck it would be false since water truck doesn't support target or average values
   * Other PR equipments would allow both timeseries1 and timeseries2 same
   **/
  if (isCompareTimeSeries && timeSeries1.length !== timeSeries2.length) {
    throw Error('timeSeries1 and timeSeries1 arrays must be the same length');
  }
  let result: TimeData[] = [];
  for (let i = 0; i < timeSeries1.length; i++) {
    let entry1 = timeSeries1[i];
    let entry2 = isCompareTimeSeries ? timeSeries2[i] : null;
    result.push({
      time: entry1.timestamp,
      value: UnitUtils.toLocalUnitValue(entry1.value, unit),
      value2: isCompareTimeSeries
        ? UnitUtils.toLocalUnitValue(entry2.value, unit)
        : null,
    });
  }
  return result;
}