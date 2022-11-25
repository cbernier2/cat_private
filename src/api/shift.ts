import moment from 'moment';

import {Shift} from './types/cat/shift';

export const findMostRecentShift = (shifts: Shift[]): Shift[] | null => {
  const now = moment().valueOf();
  const filteredShifts = shifts
    .filter(shift => shift.startTime < now)
    .slice()
    .sort((a, b) => b.startTime - a.startTime);

  const testShift = filteredShifts.find(
    shift => shift.id === 'e48bfb2f-d7b5-4df6-8a65-b47734cff768',
  );
  testShift && filteredShifts.unshift(testShift);

  return filteredShifts.length ? filteredShifts.slice(0, 3) : null;
};
