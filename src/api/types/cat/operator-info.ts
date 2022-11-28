/**
 * Interface sourced from
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/operation/operator-info.ts
 */

import {OperatorAssignmentDetails} from './assignment-details';
import {Timeline, TimelineEntry} from './production';

export interface OperatorInfo {
  id: string;
  operatorAssignments: OperatorAssignmentDetails[];
  shiftChangeAndBreaksTimeline: TimelineEntry[];
  stoppedNoReasonTimeline: TimelineEntry[];
  maintenanceTimeline: Timeline[];
  standbyTimeline: Timeline[];
  operationalDelayTimeline: Timeline[];
}
