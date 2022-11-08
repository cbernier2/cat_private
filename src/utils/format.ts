/**
 * Base on CAT's minestar-web-common repo
 * src/common/components/cell-display/cell-display.ts
 */

import i18n from 'i18next';
import {UNDEFINED_VALUE} from '../api/types/cat/common';
import {DateUtils} from './date-utils';
import {CatColumn} from '../api/types';
import {UnitUtils} from './unit-utils';
import {Summary} from '../api/types/cat/production';

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
export const formatMinutesOnly = (value?: number): string => {
  if (value) {
    let ms = Math.floor(value * 60 * 1000);
    return DateUtils.humanize(ms, 'minutes');
  }
  return UNDEFINED_VALUE;
};

export const formatUnit = (summary: Summary | undefined, column: CatColumn) => {
  return summary
    ? formatNumber(UnitUtils.toDisplayValue(summary, column.key, column.unit))
    : UNDEFINED_VALUE;
};

export const formatLabel = (
  baseLabel: string,
  summary?: Summary,
  unit?: string,
) => {
  const t = i18n.t;
  return (
    t(baseLabel) +
    (summary && unit
      ? ' ' + t(UnitUtils.toDisplayUnit(summary, unit, true))
      : '')
  );
};
