import {Shift} from './types/cat/shift';
import moment from 'moment';

export const findMostRecentShift = (shifts: Shift[]): Shift | null => {
  const now = moment().valueOf();
  const filteredShifts = shifts
    .filter(shift => shift.startTime < now)
    .slice()
    .sort((a, b) => b.startTime - a.startTime);

  return filteredShifts.length ? filteredShifts[0] : null;
};
