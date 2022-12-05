/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/utils/string-utils.ts
 * Edited for lint/prettier fixes and imports
 */

export class StringUtils {
  /**
   * Capitalise the first letter of a string.
   * @param str   The string to capitalise
   * @returns     The capitalised string
   */
  public static capitalise(str: string): string {
    if (str && str.length >= 2) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    } else if (str && str.length >= 1) {
      return str.charAt(0).toUpperCase();
    }
    return '';
  }

  /**
   * Uncapitalise the string (lowercase the first letter).
   *
   * @param str The string to uncapitalise
   * @returns   The uncapitalized string
   */
  public static uncapitalise(str: string): string {
    if (str && str.length > 0) {
      return `${str.charAt(0).toLowerCase()}${str.substr(1)}`;
    }
    return '';
  }

  /**
   * Checks whether a string is blank.
   * @param str   The string to check
   * @returns     True if the string is blank, otherwise false
   */
  public static isBlank(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  /**
   * Truncates a string so that it is no longer than the specified max length.
   * If the string is truncated, then "..." will be appended to the end.
   * @param str The string to truncate
   * @param maxLength The desired max length of the string
   */
  public static truncate(str: string, maxLength: number): string {
    if (!str || str.length <= maxLength) {
      return str;
    }
    return str.substr(0, maxLength) + '...';
  }

  /**
   * Given a boolean value, return `yes` for any truthy values and `no` for
   * falsey values
   */
  public static booleanAsYesNo(
    booleanItem: any,
    yesValue: string = 'yes',
    noValue: string = 'no',
  ): string {
    return booleanItem ? yesValue : noValue;
  }

  public static toTitleCase(str: string): string {
    return str
      .split(' ')
      .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Splits a string based on the last separator (period by default), returning an array containing:
   * - at index 0, everything preceding the period,
   * - at index 1 everything following the period
   */
  static splitOnLastSeparator(
    value: string,
    separator: string = '.',
  ): [string, string] {
    const sepIndex = value.lastIndexOf(separator);
    if (sepIndex === -1) {
      return [value, ''];
    }
    return [value.substring(0, sepIndex), value.substring(sepIndex + 1)];
  }
}
