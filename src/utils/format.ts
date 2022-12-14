/**
 * Base on CAT's minestar-web-common repo
 * src/common/components/cell-display/cell-display.ts
 */

import i18n, {t} from 'i18next';
import {UNDEFINED_VALUE} from '../api/types/cat/common';
import {DateUtils} from './date-utils';
import moment, {Moment} from 'moment';

export const formatNumber = (value?: number, numDecimals = 0) => {
  if (value) {
    const roundPow = Math.pow(10, numDecimals);
    return new Intl.NumberFormat(i18n.language).format(
      Math.round(value * roundPow) / roundPow,
    );
  } else {
    return UNDEFINED_VALUE;
  }
};

// Base on CAT's web-app: src/common/components/cell-display/cell-display.ts
export const formatMinutesOnlyFromMillis = (value?: number): string => {
  if (value) {
    let ms = Math.floor(value);
    return DateUtils.humanize(ms, 'minutes');
  }
  return UNDEFINED_VALUE;
};

export const formatMinutesOnly = (value?: number): string => {
  return formatMinutesOnlyFromMillis(value && value * 60 * 1000);
};

export const formatRelativeTime = (value?: number): string => {
  return DateUtils.from(moment(value));
};

export const formatUnit = (value?: number) => {
  return value ? formatNumber(value) : UNDEFINED_VALUE;
};

export const formatPercent = (value: number) => {
  return formatUnit(value) + (value ? t('cat.unit_percent') : '');
};

export const formatLabel = (baseLabel: string, unit?: string) => {
  return t(baseLabel) + (unit ? ' ' + t(unit) : '');
};

export const formatTime = (value: Moment | undefined) => {
  if (value) {
    return value.format('HH:mm');
  } else {
    return UNDEFINED_VALUE;
  }
};
