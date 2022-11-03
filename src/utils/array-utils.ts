/**
 * Copied from CAT's minestar-web-common repo
 * /src/utils/array-utils.ts
 */

import {ObjectUtils} from './object-utils';

export class ArrayUtils {
  /**
   * Returns a function that sorts values with the special case for a
   * lowWeighting value that is to be ordered later than others.
   *
   * @param fn (optional) the function to access the value sorted array
   * @param lowWeighting (optional) the value used as 'undefined'
   * @return function(a, b) used as a comparator
   */
  public static sortBy(fn = (x: any) => x, lowWeighting = 'undefined') {
    /**
     * Compares values by applying a resolving fn and returns the order
     * value using an ordinal. This function also uses considers a
     * lowWeighting value which is used as a 'last' order value.
     *
     * NOTE because we are casting to a string here objects get converted
     *      to '[object Object]' as such objects themselves shouldn't be
     *      resolved using the 'fn' function but a value property.
     *
     * @param a the first value to compare
     * @param b the second value to compare
     * @returns a value between -1 and 1 as to where the order should be
     */
    const sortFn = (a: any, b: any) => {
      let aValue = '' + fn(a);
      let bValue = '' + fn(b);

      return aValue === lowWeighting
        ? 1
        : bValue === lowWeighting
        ? -1
        : aValue.localeCompare(bValue);
    };
    return sortFn;
  }

  /**
   * Uses binary search to find the value in the array that is numerically closest to the search value
   * @param values        The array of values to search. The array must be sorted in ascending order.
   * @param searchValue   The search value
   * @returns             The index of the numerically closest value, or -1 if the array is empty
   */
  public static findNearestIndexOf(values: number[], searchValue: number) {
    let minIndex: number = 0;
    let maxIndex: number = values.length - 1;
    let currentIndex = -1;
    while (minIndex <= maxIndex) {
      // eslint-disable-next-line no-bitwise
      currentIndex = ((minIndex + maxIndex) / 2) | 0;
      let currentValue: number = values[currentIndex];

      if (currentValue < searchValue) {
        minIndex = currentIndex + 1;
      } else if (currentValue > searchValue) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }
    return currentIndex;
  }

  /**
   * Returns an array of items that are distinct elements from the provided array
   *
   * @param inputArray the array whose items will be analyzed
   * @returns an array of distinct elements
   */
  public static toDistinctArray<T>(inputArray: T[]): T[] {
    let retval: T[] = [];
    inputArray.forEach((input: T) => {
      if (retval.indexOf(input) === -1) {
        retval.push(input);
      }
    });
    return retval;
  }

  /**
   * Merges an existing item into the inputArray if found by the comparison
   * function using the provided merge function otherwise the value is simply
   * appended to the input array.
   *
   * @param inputArray the input array to be mutated by the value.
   * @param value the value to merge into the array.
   * @param mergeFn the function to merge the value with the existing value
   *        of the inputArray.
   * @param comparisonFn the comparison function to used when matching the
   *        value in the inputArray. (default function is equality)
   */
  public static mergeInto<T>(
    inputArray: T[],
    value: T,
    mergeFn: (a: T, b: T) => T,
    comparisonFn: (a: T) => (b: T) => boolean = a => b => a === b,
  ) {
    let i = inputArray.findIndex(comparisonFn(value));
    if (i >= 0) {
      inputArray[i] = mergeFn(inputArray[i], value);
    } else {
      inputArray.push(value);
    }
    return inputArray;
  }

  public static groupBy<T>(key: string, array: T[]): Map<string, T[]> {
    let map: Map<string, T[]> = new Map();
    array.forEach((a: any) => {
      if (!map.has(a[key])) {
        map.set(a[key], []);
      }
      map.get(a[key])?.push(a);
    });
    return map;
  }

  public static toMap<T>(key: string, array: T[]): Map<string, T> {
    let map: Map<string, T> = new Map();
    array.forEach((a: any) => map.set(a[key], a));
    return map;
  }

  public static isEqual<T>(array1: T[], array2: T[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }
    return !ObjectUtils.isValid(
      array1.find((value, index) => value !== array2[index]),
    );
  }

  public static isEmpty<T>(array: T[]): boolean {
    return ObjectUtils.isNotValid(array) || !array.length;
  }

  public static isNotEmpty<T>(array: T[]): boolean {
    return ObjectUtils.isValid(array) && array.length !== 0;
  }
}
