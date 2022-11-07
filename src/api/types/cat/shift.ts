// Copy from Caterpillar Web App: src/common/providers/shift/shift.ts

import {Person} from './person';
import {OperatorBreak} from './operator-break';

export interface Shift {
  shiftId: string;
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  color?: string;
  templateId?: string;
  templateName?: string;
  shiftChangeEndTime?: number;
  shiftChangeStartTime?: number;
  expectedOperatorBreaks?: OperatorBreak[];
  nominalOperationalTimeline?: any[];
  crew?: string;
}

export const enum ShiftType {
  CURRENT = 'CURRENT',
  HISTORICAL = 'HISTORICAL',
  FUTURE = 'FUTURE',
}

export class ShiftUtils {
  public static isCrewMember(shift: Shift, person: Person): boolean {
    return (
      !shift.crew ||
      !person.crew ||
      shift.crew.toLowerCase() === person.crew.toLowerCase()
    );
  }
}
