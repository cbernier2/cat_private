import {Shift} from './types/cat/shift';

export const findMostRecentShift = (shifts: Shift[]): Shift | null => {
  const now = new Date();
  const filteredShifts = shifts
    .filter(shift => shift.startTime < now.getTime())
    .slice()
    .sort((a, b) => b.startTime - a.startTime);

  return filteredShifts.length ? filteredShifts[0] : null;
};
