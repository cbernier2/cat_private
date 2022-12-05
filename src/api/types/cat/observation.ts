/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/observation/observation.ts
 * Edited for lint/prettier fixes and imports
 */

import {v4 as uuidv4} from 'uuid';
import {PlanAreaProductionStatus, SaveOptions} from './common';
import {DateUtils} from '../../../utils/date-utils';
import moment from 'moment';

export interface ObservationDO extends SaveOptions {
  id: string;
  name?: string;
  startTime: number;
  endTime: number;
  observationType: string;
  description?: string;
  observedEquipmentId?: string;
  observedPlanAreaId?: string;
  observedValue?: number;
  observedValueId?: string;
  observedValueAsString?: string;
  deleted?: boolean;
  lastUpdateTime: number; // A timestamp that indicates when this observation was last updated
  attributes?: {
    [name: string]: string;
  };
}

export class ObservationType {
  public static readonly MATERIAL: string = 'material';
  public static readonly MANUAL_SMU: string = 'manualSmu';
  public static readonly OPERATOR: string = 'operator';
  public static readonly PLAN_AREA_PRODUCTION_STATUS: string =
    'planAreaProductionStatus';
  public static readonly STOP_REASON_TYPE: string = 'stopReasonType';
  public static readonly DUMP_OVERRIDE = 'dumpOverride';
}

export const enum DumpOverrideType {
  FLAG_CYCLE = 'FLAG_CYCLE',
  SUPPRESS_DUMP = 'SUPPRESS_DUMP',
  FORCE_DUMP = 'FORCE_DUMP',
}

export class ObservationBuilder {
  public static forPlanAreaMaterial(
    planAreaId: string,
    materialId: string,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: moment().valueOf(),
      endTime: moment().valueOf(),
      observationType: ObservationType.MATERIAL,
      observedPlanAreaId: planAreaId,
      observedValueId: materialId,
      lastUpdateTime: moment().valueOf(),
    };
  }

  public static forEquipmentMaterial(
    equipmentId: string,
    materialId: string,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: moment().valueOf(),
      endTime: DateUtils.MAX_TIMESTAMP_VALUE,
      observationType: ObservationType.MATERIAL,
      observedEquipmentId: equipmentId,
      observedValueId: materialId,
      lastUpdateTime: moment().valueOf(),
    };
  }

  public static forEquipmentOperator(
    equipmentId: string,
    operatorId: string,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: moment().valueOf(),
      endTime: DateUtils.MAX_TIMESTAMP_VALUE,
      observationType: ObservationType.OPERATOR,
      observedEquipmentId: equipmentId,
      observedValueId: operatorId,
      lastUpdateTime: moment().valueOf(),
    };
  }

  public static forStopReason(
    equipmentId: string,
    stopReasonTypeId?: string,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: moment().valueOf(),
      endTime: DateUtils.MAX_TIMESTAMP_VALUE,
      observationType: ObservationType.STOP_REASON_TYPE,
      observedEquipmentId: equipmentId,
      observedValueId: stopReasonTypeId,
      lastUpdateTime: moment().valueOf(),
    };
  }

  public static forPlanAreaProductionStatus(
    planAreaId: string,
    planAreaOperationalStatus: PlanAreaProductionStatus,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: moment().valueOf(),
      endTime: DateUtils.MAX_TIMESTAMP_VALUE,
      observationType: ObservationType.PLAN_AREA_PRODUCTION_STATUS,
      observedPlanAreaId: planAreaId,
      observedValueAsString: planAreaOperationalStatus,
      lastUpdateTime: moment().valueOf(),
    };
  }

  public static forFlagCycleOrDumpSuppressionObservation(
    equipmentId: string,
    activityReason: string,
    startTime?: number,
    endTime?: number,
  ): ObservationDO {
    return {
      id: uuidv4(),
      startTime: startTime ? startTime : moment().valueOf(),
      endTime: endTime ? endTime : moment().valueOf(),
      observationType: ObservationType.DUMP_OVERRIDE,
      observedEquipmentId: equipmentId,
      deleted: false,
      observedValueAsString: activityReason,
      lastUpdateTime: moment().valueOf(),
    };
  }
}
