/**
 * Base on CAT's minestar-web-common repo
 * src/common/utils/date-utils.ts
 */

import moment from 'moment';
import {unitOfTime} from 'moment/moment';

export class DateUtils {
  public static readonly MAX_TIMESTAMP_VALUE: number = 9007199254740991;

  public static readonly MINUTE = 6e4;
  public static readonly HOUR = 36e5;
  public static readonly DAY = 864e5;
  public static readonly WEEK = 6048e5;

  public static toMoment(date: Date): any {
    return moment([
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ]);
  }

  public static fromTimeStamp(timeStamp?: number): Date {
    const date = timeStamp ? moment(timeStamp) : moment();
    return new Date(
      date.year(),
      date.month(),
      date.date(),
      date.hours(),
      date.minutes(),
      date.seconds(),
      date.milliseconds(),
    );
  }

  public static from(from: any, now?: any) {
    now = now || moment();
    let diff = Math.abs(from.diff(now));
    if (diff <= DateUtils.WEEK) {
      let result = DateUtils.humanize(diff);
      result = (moment.localeData() as any).pastFuture(from.diff(now), result);
      return result;
    } else if (from.year() !== now.year()) {
      return from.format('MMMM D, YYYY');
    } else {
      return from.format('MMMM D, HH:mm');
    }
  }

  /**
   * Provide a humanized version of a millisecond value e.g. 1d or 1s
   * @param diff millisecond value to humanize
   * @param highlight If the numeric value should be
   * @param preferredUnit If provided, will return value diff in the named units.  Can be null
   */
  public static humanize(diff: number, preferredUnit: string | null = null) {
    let num;
    let unitLabel;

    if (preferredUnit) {
      let diffAsDuration = moment.duration(diff);

      switch (preferredUnit) {
        case 'seconds': {
          num = Math.max(1, diffAsDuration.asSeconds());
          unitLabel = 's';
          break;
        }
        case 'minutes': {
          num = Math.max(1, diffAsDuration.asMinutes());
          unitLabel = ' min';
          break;
        }
        case 'hours': {
          num = Math.max(1, diffAsDuration.asHours());
          unitLabel = 'h';
          break;
        }
        case 'days': {
          num = Math.max(1, diffAsDuration.asDays());
          unitLabel = 'd';
          break;
        }
        default: {
          num = Math.max(1, diffAsDuration.asMonths());
          unitLabel = 'mn';
          break;
        }
      }
      num = Math.floor(num);
    } else {
      let unit: unitOfTime.Base;
      if (diff < DateUtils.MINUTE) {
        unit = 'seconds';
        unitLabel = unit.charAt(0);
      } else if (diff < DateUtils.HOUR) {
        unit = 'minutes';
        unitLabel = ' min'; // space prepended as per 'preferredUnit'
      } else if (diff < DateUtils.DAY) {
        unit = 'hours';
        unitLabel = unit.charAt(0);
      } else if (diff < DateUtils.WEEK) {
        unit = 'days';
        unitLabel = unit.charAt(0);
      } else {
        unit = 'months';
        unitLabel = 'mn';
      }
      num = Math.max(1, moment.duration(diff)[unit]());
    }

    return num + unitLabel;
  }

  /**
   * Provide formatted hours and minutes for a duration (in milliseconds).
   * @param durationMillis The duration to format (in milliseconds).
   * @param supportSeconds optional param to return seconds value . like 57S.
   * @returns A string representing the formatted duration (e.g. 3h 1m)
   */
  public static formatDuration(
    durationMillis: number,
    supportSeconds?: boolean,
  ): string {
    let hours: number = moment.duration(durationMillis).hours();
    let mins: number = moment.duration(durationMillis).minutes();
    let secs: number = moment.duration(durationMillis).seconds();

    let result: string = '';
    if (hours > 0) {
      result += hours + 'h ';
    }
    if (mins > 0) {
      result += mins + 'm ';
    }

    if (supportSeconds && secs > 0 && result.length === 0) {
      result += secs + 's';
    }
    if (result.length === 0) {
      result += '0m';
    }
    return result.trim();
  }

  public static isNullTimestamp(epochTimestamp: number): boolean {
    if (!epochTimestamp) {
      return true;
    }
    return this.MAX_TIMESTAMP_VALUE === epochTimestamp;
  }
}
