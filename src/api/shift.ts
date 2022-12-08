// Base on the web app: src/common/providers/shift/shift.service.ts

import moment from 'moment';

import {Shift, ShiftType} from './types/cat/shift';

export const findMostRecentShift = (shifts: Shift[]): Shift[] | null => {
  const now = moment().valueOf();
  const filteredShifts = shifts
    .filter(shift => shift.startTime < now)
    .slice()
    .sort((a, b) => b.startTime - a.startTime);

  return filteredShifts.length ? filteredShifts.slice(0, 3) : null;
};

export const findShiftType = (now: number, shift: Shift): ShiftType => {
  if (!shift) {
    return ShiftType.CURRENT;
  }
  if (shift.startTime < now && shift.endTime < now) {
    return ShiftType.HISTORICAL;
  } else if (shift.startTime > now && shift.endTime > now) {
    return ShiftType.FUTURE;
  } else {
    return ShiftType.CURRENT;
  }
};
