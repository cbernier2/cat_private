/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/utils/math-utils.ts
 * Edited for lint/prettier fixes and imports
 */

import {ArrayUtils} from './array-utils';
import {TimeData} from '../components/graphs/types';

export const enum InterpolationType {
  LINEAR = 'LINEAR',
  STEP = 'STEP',
  STEP_BEFORE = 'STEP_BEFORE',
  STEP_AFTER = 'STEP_AFTER',
}

export class MathUtils {
  /**
   * Gets a random integer between 0 and the specified maximum number (inclusive of 0, but not the maximum).
   * For example:
   *      getRandomInt(3); // expected output: 0, 1 or 2
   */
  public static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * Clamp function which contrains the passed in value to the provided min and max.
   *
   * @param value the value to be clamped without the passed bounds
   * @param min the minimum value to return
   * @param max the maximum value to return
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  /**
   * Interpolates Y value for a given X value between two data points.
   * @param x1    X value of the first data point
   * @param y1    Y value of the first data point
   * @param x2    X value of the second data point
   * @param y2    Y value of the second data point
   * @param atX   X value at which to interpolate the Y value
   * @param interpolationType
   * @returns     Interpolated Y value at the given X value between the two data points
   */
  public static interpolateY(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    atX: number,
    interpolationType: InterpolationType = InterpolationType.LINEAR,
  ): number {
    switch (interpolationType) {
      case InterpolationType.STEP:
        if (atX < x1 + (x2 - x1) / 2) {
          return y1;
        }
        return y2;
      case InterpolationType.STEP_BEFORE:
        return y2;
      case InterpolationType.STEP_AFTER:
        return y1;
      case InterpolationType.LINEAR:
      default:
        // Fallback to linear
        let xDiff: number = x2 - x1;
        let yDiff: number = y2 - y1;
        let slope: number = yDiff / xDiff;
        let b: number = y1 - slope * x1;
        let y: number = slope * atX + b;
        return y;
    }
  }

  /**
   * Interpolates an angle (radians) for a given X value between two data points.
   * @param x1        X value of the first data point
   * @param angle1    Angle (radians) of the first data point
   * @param x2        X value of the second data point
   * @param angle2    Angle (radians) of the second data point
   * @param atX       X value at which to interpolate the angle
   * @returns         Interpolated angle (radians) at the given X value between the two data points
   */
  public static interpolateAngle(
    x1: number,
    angle1: number,
    x2: number,
    angle2: number,
    atX: number,
  ): number {
    let xDiff: number = x2 - x1;
    let shortestAngle: number =
      ((((angle2 - angle1) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) -
      Math.PI;
    let slope: number = shortestAngle / xDiff;
    let b: number = angle1 - slope * x1;
    let angle: number = slope * atX + b;
    let clampedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return clampedAngle;
  }

  /**
   * Gets a time series value at a specified point in time. Returns null if the time series is empty.
   * If the time series does not have an entry for the specified point in time, a value will be interpolated
   * using the nearest neighbours.
   * @param atTime The point in time to get the value at.
   * @param values The time series of values.
   * @param interpolationType The interpolation type to use when the time series does not have an entry for the specified point in time.
   * @returns The value at the specified point in time.
   */
  public static getTimeSeriesValueAt(
    atTime: number,
    values: TimeData[],
    interpolationType: InterpolationType = InterpolationType.LINEAR,
  ): number | null {
    let timeValues: number[] = values.map((td: TimeData) => td.time);
    let nearestIndex: number = ArrayUtils.findNearestIndexOf(
      timeValues,
      atTime,
    );
    if (nearestIndex === -1) {
      return null;
    }
    let nearestItem: TimeData = values[nearestIndex];
    let value: number | null = null;
    if (nearestItem.time < atTime && values.length > nearestIndex + 1) {
      let nextItem: TimeData = values[nearestIndex + 1];
      value = MathUtils.interpolateY(
        nearestItem.time,
        nearestItem.value,
        nextItem.time,
        nextItem.value,
        atTime,
        interpolationType,
      );
    } else if (nearestItem.time > atTime && nearestIndex - 1 >= 0) {
      let prevItem: TimeData = values[nearestIndex - 1];
      value = MathUtils.interpolateY(
        prevItem.time,
        prevItem.value,
        nearestItem.time,
        nearestItem.value,
        atTime,
        interpolationType,
      );
    } else {
      value = nearestItem.value;
    }
    return value;
  }
}
