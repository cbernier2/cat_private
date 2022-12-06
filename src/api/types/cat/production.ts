// Copy from Caterpillar Web App: src/common/providers/production/production-summary.ts
// Edit: define EquipmentTimeline to call findStopReasonTypeIdAtTime witih a CatEquipmentSummary

import {Route} from './route';
import {PlanArea} from './plan-area';
import {Equipment} from './equipment';
import {Labelable, Timestampable} from './common';

export interface HourlyRateMetric {
  minimum: number;
  quarter1: number;
  median: number;
  quarter3: number;
  maximum: number;
}

export interface Timeline {
  classification: string;
  startTime: number;
  endTime: number;
  loginTime?: number;
  logoutTime?: number;
  duration: number;
  stopReasonTypeId?: string;
  stopReasonDescription?: string;
  fuelingOccurred?: boolean;
}

/**
 * TimelineEntry Interface sourced from
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/common/timeline-entry.ts
 */
export interface TimelineEntry {
  classification: string;
  startTime: number;
  endTime: number;
  loginTime?: number;
  logoutTime?: number;
  duration: number;
  iconName?: string;
  additionalIconNamesMap?: Map<string, string>;
  auxLabel?: string;
  isOnGoing?: boolean;
  showDataProcessingDelay?: boolean;
  toolTipDescription?: string;
}

export interface Summary {
  id: string;
  name: string;
  '@type': string;
  startTime: number;
  endTime: number;
  deleted: boolean;
  currentTime: number;
  lastDataFusionTime: number;
  lastUpdateTime: number;
  loadUnit: string;
  loadRateUnit: string;
  massUnit: string;
  massFlowRateUnit: string;
  volumeUnit: string;
  volumetricFlowRateUnit: string;
  preferredProdVolumeUnit: string;
  preferredProdVolumetricFlowRateUnit: string;
  fuelLevelPercent?: number;
  totalLoads: number;
  averageLoadRate: number;
  loadRateByHour: Labelable & {
    values: Array<{value: HourlyRateMetric} & Timestampable>;
  };
  cumulativeLoads: Labelable & {values: Array<{value: number} & Timestampable>};
  hourlyLoads: Labelable & {values: Array<{value: number} & Timestampable>};
  hourlyScheduledBreakLoads: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  materialLoads: {[id: string]: number};
  firstHourLoads: number;
  currenthourLoads: number;
  lastHourLoads: number;
  totalMass: number;
  averageMassRate: number;
  massRateByHour: Labelable & {
    values: Array<{value: HourlyRateMetric} & Timestampable>;
  };
  cumulativeMass: Labelable & {values: Array<{value: number} & Timestampable>};
  hourlyMass: Labelable & {values: Array<{value: number} & Timestampable>};
  hourlyScheduledBreakMass: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  materialMass: {[id: string]: number};
  firstHourMass: number;
  currentHourMass: number;
  lastHourMass: number;
  totalVolume: number;
  averageVolumeRate: number;
  volumeRateByHour: Labelable & {
    values: Array<{value: HourlyRateMetric} & Timestampable>;
  };
  cumulativeVolume: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  hourlyVolume: Labelable & {values: Array<{value: number} & Timestampable>};
  hourlyScheduledBreakVolume: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  materialVolume: {[id: string]: number};
  firstHourVolume: number;
  currentHourVolume: number;
  lastHourVolume: number;
  projectedTotalLoads: number;
  projectedTotalMass: number;
  projectedTotalVolume: number;
  projectedCumulativeLoads: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  projectedCumulativeMass: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  projectedCumulativeVolume: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  currentLoadRate: number;
  currentMassRate: number;
  currentVolumeRate: number;
  lastCycleTime: number;
  materialTimeSeries: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  hasVariationsValue: boolean;
  variationAbsolute: boolean;
  variationLoads: number;
  variationMass: number;
  variationVolume: number;
  averageCycleTime: number;
  averageSlopeDistanceEmpty: number;
  averageSlopeDistanceFull: number;
  lengthUnit: string;
  target: number;
  targetMaxThreshold: number;
  targetMinThreshold: number;
  targetUnit: string;
  currentHourLoads: number;
  averageQueuingDurationEmpty: number;
  averageQueuingDurationFull: number;
  cumulativeTarget: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  cumulativeTargetMaxThreshold: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
  cumulativeTargetMinThreshold: Labelable & {
    values: Array<{value: number} & Timestampable>;
  };
}

export interface HaulCyclesSummary extends Summary {}

export interface PlanAreaSummary extends Summary {
  area: PlanArea;
  materialObservationForPlanArea: string;
}

export interface EquipmentSummary extends Summary {
  fuelLevelPercent: number;
  fuelState: string;
  smu: number;
  smuSource: string;
  operationalState: string;
  lastReading: number;
  startedTime: number;
  runningTime: number;
  unutilisedTime: number;
  timeToEquipmentFailure: number;
  timeToFuelCritical: number;
  keyStateTimeline: Array<Timeline>;
  shiftChangeAndBreaksTimeline: Array<Timeline>;
  fuelingTimeline: Array<Timeline>;
  stoppedNoReadonTimeline: Array<Timeline>;
  maintenanceTimeline: Array<Timeline>;
  standbyTimeline: Array<Timeline>;
  operationalDelayTimeline: Array<Timeline>;
  operatorTimeSeries: Labelable & {
    values: Array<{value: string} & Timestampable>;
  };
  lastPlanAreaId: string;
  timeInLastPlanArea: number;
  inLastPlanAreaAtCurrentTime: boolean;
  lastObservedLoaderId: string;
  lastObservedDestinationAreaId: string;
  lastObservedMaterialId: string;
  nominalPayloadValue: number;
  nominalPayloadUnit: string;
  lastAssignedLoaderProductionSummary: any;
  lastAssignedPlanAreaId?: number;
  lastObservedOperatorId?: string;
  lastObservedLoadAreaId?: string;
  lastObservedDumpAreaId?: string;
}

export type MaterialSummary = Summary & {materialId: string};
export type LoadAreaSummary = PlanAreaSummary & {loadArea: PlanArea};
export type DumpAreaSummary = PlanAreaSummary & {dumpArea: PlanArea};
export type LoadEquipmentSummary = EquipmentSummary & {loader: Equipment};
export type AllLoadEquipmentSummary = LoadEquipmentSummary & {
  lhdProductionSummary?: LoadEquipmentSummary;
  haulProductionSummary?: LoadEquipmentSummary;
};
export type HaulEquipmentSummary = EquipmentSummary & {truck: Equipment};
export type SupportEquipmentSummary = EquipmentSummary & {equipment: Equipment};
export type WaterTruckSummary = EquipmentSummary & {
  equipment: Equipment;
  waterLevelPercent: number;
  totalVolume: number;
  waterTankCapacity: number;
};
export type RouteSummary = Summary & {route: Route};

export type EquipmentTimeline = {
  maintenanceTimeline: Array<Timeline>;
  standbyTimeline: Array<Timeline>;
  operationalDelayTimeline: Array<Timeline>;
};

export namespace EquipmentSummaryUtils {
  export function findStopReasonTypeIdAtTime(
    equipmentSummary: EquipmentTimeline,
    atTime: number,
  ): string | null | undefined {
    let findFunction = (value: Timeline) =>
      value.startTime <= atTime && value.endTime >= atTime;
    let timeLine: Timeline | null | undefined = null;
    if (equipmentSummary.maintenanceTimeline.length) {
      timeLine = equipmentSummary.maintenanceTimeline.find(findFunction);
      if (timeLine) {
        return timeLine.stopReasonTypeId;
      }
    }
    if (equipmentSummary.standbyTimeline.length) {
      timeLine = equipmentSummary.standbyTimeline.find(findFunction);
      if (timeLine) {
        return timeLine.stopReasonTypeId;
      }
    }
    if (equipmentSummary.operationalDelayTimeline.length) {
      timeLine = equipmentSummary.operationalDelayTimeline.find(findFunction);
      if (timeLine) {
        return timeLine.stopReasonTypeId;
      }
    }
    return null;
  }
}

export interface ProductionSummary {
  id: string;
  shiftId: string;
  siteSummary: Summary;
  siteLoadSummary: Summary;
  materialSummaries: Array<MaterialSummary>;
  loadAreaSummaries: Array<LoadAreaSummary>;
  dumpSummaries: Array<DumpAreaSummary>;
  loadEquipSummaries: Array<AllLoadEquipmentSummary>;
  crusherSummaries: Array<PlanAreaSummary>;
  haulEquipSummaries: Array<HaulEquipmentSummary>;
  supportEquipSummaries: Array<SupportEquipmentSummary>;
  waterTruckSummaries: Array<WaterTruckSummary>;
  routeSummaries: Array<RouteSummary>;
}
