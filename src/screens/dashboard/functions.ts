import {Summary} from '../../api/types/cat/production';
import {SUMMARY_COLUMNS} from './constants';
import {UnitType} from '../../api/types/cat/common';

export const isAttentionRequired = (summary: Summary, unitType: UnitType) => {
  const projected = (summary as any)[SUMMARY_COLUMNS.projected[unitType].key];
  if (projected) {
    return Number(projected) < summary.target;
  } else {
    return false;
  }
};
