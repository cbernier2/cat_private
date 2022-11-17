import {max} from 'd3-array';

import {TimeData} from '../types';

/**
 * Sourced from getMaxVal()
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/components/charts/hour-chart/hour-chart.ts#L599
 * Return the maximum value from the data.
 * Edited to fit new location and RN vs Angular
 */
export function getMaxValue(
  average: number | null,
  maxThreshold: number | null,
  target: number | null,
  values: TimeData[],
): number {
  // determine the maximum value out of the configured max/target/lineValue values and the max value from the data
  let maxDataValue: number =
    max(values, d =>
      d.hasOwnProperty('value2')
        ? Number(d.value) + Number(d.value2)
        : Number(d.value),
    ) ?? 0;

  // determine the max target value, based on whether there's an upper target threshold
  // or if not, falling back to the target value.
  let maxTargetValue: number = maxThreshold
    ? maxThreshold
    : target
    ? target
    : 0;

  let maxExternalValue: number =
    max([maxTargetValue ?? 0, average ?? 0, 2]) ?? 0;

  // if the maximum data value to be presented is within 10% of the top of maximum, we want to return a higher maximum to allow
  // a buffer to be displayed at the top of our charts (so the bars don't hit the top).  So, always return 10% more than the actual max.
  let minDataHeight: number = maxDataValue; // + Math.ceil(0.1 * maxDataValue);
  return minDataHeight > maxExternalValue ? minDataHeight : maxExternalValue;
}
