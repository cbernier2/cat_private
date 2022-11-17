/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/haul-cycle/haul-cycle.ts
 * Edited for lint/prettier fixes and imports
 */

import {Equipment} from './equipment';
import {PlanArea} from './plan-area';
import {Material} from './material';

export interface HaulCycles {
  haulCycles: HaulCycle[];
}

/**
 * A Haul cycle data definition adhering to the server side
 * `ProductionCycleSummaryDO`. (an abridged version of a ProductionCycle)
 *
 * NOTE the data structure comes into the system where the Equipment, PlanArea
 *      and Material are strings (uuid's) but updated to reflect their object
 *      couterparts. *With the expection of shift which is kept as a string*
 *
 * @since 2.0.85
 */
export interface HaulCycle {
  id: string;
  shift: string; // used for filtering on mobile
  loadEquipment: Equipment;
  haulEquipment: Equipment;
  loadStartTime: number;
  loadCompletedTime: number;
  loadingTime: number;
  loadPosition: string;
  sourceArea: PlanArea;
  dumpStartTime: number;
  dumpCompletedTime: number;
  dumpPosition: string;
  destinationArea: PlanArea;
  material: Material;
  massValue: number;
  massUnit: string;
  volumeValue: number;
  volumeUnit: string;
  simplifiedPath: string;
  loadHaulDumpCycle?: boolean;
  flagged: boolean;
}
