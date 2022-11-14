import {max} from 'd3-array';

import {TimeData} from '../types';

/**
 * Sourced from getMaxVal()
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/components/charts/line-chart/line-chart.ts#L914
 * Return the maximum value from the data.
 * Edited to fit new location and RN vs Angular
 * Commented offset portion as per ./Component's TODO
 */
export function getMaxValue(
  maxThreshold: TimeData[],
  target: TimeData[],
  values: TimeData[],
  projected: TimeData[],
): number {
  // determine the max target value, based on whether there's an upper target threshold
  // or if not, falling back to the target value.
  const maxTargetValue = maxThreshold.length
    ? max(maxThreshold, data => data.value)
    : target.length
    ? max(target, data => data.value)
    : 0;

  // if there's no data but there's a offset, let's return that
  // if (!this.data || !this.data.length) {
  //   // if there is a target set but no data, make sure that the y axis reflects either the target or the offset
  //   if (this.offset > 0) {
  //     return Math.max(maxTargetValue, this.offset);
  //   }
  // }

  let maxDataValue = max(values, data => data.value);
  let maxProjectedValue = max(projected, data => data.value);
  let maxExternalValue = max([maxTargetValue, maxProjectedValue, 2]);

  // NOTE - not sure this is done anymore... refine comment as required:
  // if the maximum data value to be presented is within 10% of the top of
  // maximum, we want to return a higher maximum to allow a buffer to be displayed
  // at the top of our charts (so the bars don't hit the top).  So, always return 10%
  // more than the actual max.
  let minDataHeight: number = maxDataValue ? maxDataValue : 0; // + Math.ceil(0.1 * maxDataValue);
  //let maxValue =
  return minDataHeight > maxExternalValue ? minDataHeight : maxExternalValue;

  // adjust the maxValue if an absolute offset is set, and it is larger than
  // the calculated maxValue. If it's smaller, don't adjust.
  // if (this.offsetType === OffsetType.ABSOLUTE && this.offset > 0) {
  //   if (this.offset > maxValue) {
  //     maxValue = this.offset;
  //   }
  // }

  // return maxValue;
}
