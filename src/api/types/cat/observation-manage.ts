/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/observation-manage/observation-manage.ts
 * Edited for lint/prettier fixes and imports
 */

import {TimeOption} from './time-option';
import {CommonConstants} from './common';
import {DumpOverrideType, ObservationDO, ObservationType} from './observation';
import {DateUtils} from '../../../utils/date-utils';
import {ObservationUtils} from '../../observation';
import {v4 as uuidv4} from 'uuid';
import {
  StopReasonTypeDecorated,
  StopReasonTypeDO,
  StopReasonTypeUtils,
} from './stop-reason';
import {Person} from './person';
import {Material} from './material';
import {cloneDeep} from 'lodash';
import {TimeData} from '../../../components/graphs/types';

export interface ObservationManage {
  id: string;
  startTimeData: TimeData;
  endTimeData: TimeData;
  startTimeOption: TimeOption;
  endTimeOption: TimeOption;
  deleted: boolean;
  lastUpdateTime: number;
  attributes?: {
    [name: string]: string;
  };
}

export interface StopReasonObservation extends ObservationManage {
  stopReasonType?: StopReasonTypeDO;
  description?: string;
  observedEquipmentId?: string;
}

export interface DumpOverrideObservation extends ObservationManage {
  dumpOverrideType: DumpOverrideType;
  description?: string;
  observedEquipmentId?: string;
}

export interface OperatorObservation extends ObservationManage {
  operator: Person;
}

export interface MaterialObservation extends ObservationManage {
  material: Material;
}

export interface ObservationError {
  type: string;
  startTime: string;
  endTime: string;
}

export namespace ObservationManageUtils {
  export function compareLastUpdateTime(
    observationManage1: ObservationManage,
    observationManage2: ObservationManage,
  ): number {
    if (observationManage2.lastUpdateTime > observationManage1.lastUpdateTime) {
      return 1;
    }
    if (observationManage2.lastUpdateTime < observationManage1.lastUpdateTime) {
      return -1;
    }
    return 0;
  }

  export function mapToTimeData(
    observationManages: ObservationManage[],
  ): TimeData[] {
    let result: ObservationManage[] = [];
    let timeData: TimeData[] = [];
    observationManages.forEach(
      (observationManage: ObservationManage, index) => {
        // clone object as it is mutated
        let obsManage = cloneDeep(observationManage);
        obsManage.endTimeData.value = {
          id: CommonConstants.NO_VALUE_ID,
          color: CommonConstants.NO_VALUE_COLOUR,
        };
        if (index !== 0) {
          result.forEach((r, i) => {
            if (ObservationUtils.isEndTimeOverLap(r, obsManage)) {
              r.startTimeData.time = obsManage.endTimeData.time;
            } else if (ObservationUtils.isStartTimeOverLap(r, obsManage)) {
              r.endTimeData.time = obsManage.startTimeData.time;
            } else if (ObservationUtils.isFullOverLap(r, obsManage)) {
              result = result.filter(value => value.id !== r.id);
            } else if (ObservationUtils.isFullOverLapAndSplit(r, obsManage)) {
              let newResult: ObservationManage = cloneDeep(r);
              newResult.id = uuidv4();
              newResult.startTimeData.time = obsManage.endTimeData.time;
              newResult.startTimeData.value = r.startTimeData.value;
              r.endTimeData.time = obsManage.startTimeData.time;
              result.splice(i + 1, 0, newResult);
            }
          });
        }
        result.push(cloneDeep(obsManage));
      },
    );
    result
      .sort((r1, r2) => r1.startTimeData.time - r2.startTimeData.time)
      .forEach(r => {
        timeData.push(r.startTimeData);
        timeData.push(r.endTimeData);
      });
    return timeData;
  }

  export function mapToObservation(
    observationManage: ObservationManage,
    observationType: ObservationType,
  ): ObservationDO {
    return {
      id: observationManage.id,
      startTime: observationManage.startTimeData.time,
      endTime: observationManage.endTimeData.time,
      lastUpdateTime: observationManage.lastUpdateTime,
      observationType: observationType as string,
      deleteForever: observationManage.deleted,
    };
  }

  export function mapToObservationManage(
    observation: ObservationDO,
  ): ObservationManage {
    return {
      id: observation.id,
      startTimeData: {time: observation.startTime ?? 0, value: null},
      endTimeData: {time: observation.endTime ?? 0, value: null},
      startTimeOption: TimeOption.CUSTOM,
      endTimeOption:
        observation.endTime === DateUtils.MAX_TIMESTAMP_VALUE
          ? TimeOption.ON_GOING
          : TimeOption.CUSTOM,
      deleted: observation.deleteForever ?? false,
      lastUpdateTime: observation.lastUpdateTime,
    };
  }

  export function mapToStopReasonObservation(
    observation: ObservationDO,
    stopReasonType?: StopReasonTypeDecorated,
  ): StopReasonObservation {
    let observationManage =
      ObservationManageUtils.mapToObservationManage(observation);
    let value = StopReasonTypeUtils.mapToValue(stopReasonType);
    observationManage.startTimeData.value = value;
    observationManage.endTimeData.value = value;
    let stopReasonObservation: StopReasonObservation =
      observationManage as StopReasonObservation;
    stopReasonObservation.description = observation.description;
    stopReasonObservation.stopReasonType = stopReasonType?.stopReasonTypeDO;
    stopReasonObservation.observedEquipmentId = observation.observedEquipmentId;
    return stopReasonObservation;
  }

  export function mapToOperatorObservation(
    observation: ObservationDO,
    operator: Person,
  ): OperatorObservation {
    let observationManage =
      ObservationManageUtils.mapToObservationManage(observation);
    observationManage.startTimeData.value = operator;
    observationManage.endTimeData.value = operator;
    let operatorObservation: OperatorObservation =
      observationManage as OperatorObservation;
    operatorObservation.operator = operator;
    return operatorObservation;
  }

  export function mapToMaterialObservation(
    observation: ObservationDO,
    material: Material,
  ): MaterialObservation {
    let observationManage =
      ObservationManageUtils.mapToObservationManage(observation);
    observationManage.startTimeData.value = material;
    observationManage.endTimeData.value = material;
    let materialObservation: MaterialObservation =
      observationManage as MaterialObservation;
    materialObservation.material = material;
    return materialObservation;
  }

  export function mapToDumpOverrideObservation(
    observation: ObservationDO,
    translationFn: (label: string) => string,
  ): DumpOverrideObservation {
    const observationManage =
      ObservationManageUtils.mapToObservationManage(observation);
    const dumpOverrideObservation: DumpOverrideObservation =
      observationManage as DumpOverrideObservation;
    dumpOverrideObservation.dumpOverrideType =
      observation.observedValueAsString as DumpOverrideType;
    let value = DumpOverrideObservationManageUtils.mapToValue(
      dumpOverrideObservation.dumpOverrideType,
      translationFn,
    );
    dumpOverrideObservation.startTimeData.value = value;
    dumpOverrideObservation.startTimeData =
      DumpOverrideObservationManageUtils.updateIconNameAndType(
        dumpOverrideObservation.startTimeData,
        dumpOverrideObservation.dumpOverrideType,
      );
    dumpOverrideObservation.endTimeData.value = value;
    dumpOverrideObservation.description = observation.description;
    dumpOverrideObservation.observedEquipmentId =
      observation.observedEquipmentId;
    return dumpOverrideObservation;
  }

  export function stopReasonObservationPrecedenceComparator(
    o1: StopReasonObservation,
    o2: StopReasonObservation,
  ) {
    const o1maintenance =
      o1.stopReasonType &&
      StopReasonTypeUtils.isMaintenanceType(o1.stopReasonType);
    const o2maintenance =
      o2.stopReasonType &&
      StopReasonTypeUtils.isMaintenanceType(o2.stopReasonType);
    if (o1maintenance && !o2maintenance) {
      return 1;
    } else if (o2maintenance && !o1maintenance) {
      return -1;
    } else {
      return o1.lastUpdateTime - o2.lastUpdateTime;
    }
  }
}

export namespace StopReasonObservationManageUtils {
  export function mapToObservation(
    stopReasonObservation: StopReasonObservation,
  ): ObservationDO {
    let observation = ObservationManageUtils.mapToObservation(
      stopReasonObservation,
      ObservationType.STOP_REASON_TYPE,
    );
    observation.observedValueId = stopReasonObservation.stopReasonType?.id;
    observation.description = stopReasonObservation.description;
    observation.observedEquipmentId = stopReasonObservation.observedEquipmentId;
    return observation;
  }
}
export namespace DumpOverrideObservationManageUtils {
  export function mapToObservation(
    dumpOverrideObservation: DumpOverrideObservation,
  ): ObservationDO {
    const observation = ObservationManageUtils.mapToObservation(
      dumpOverrideObservation,
      ObservationType.DUMP_OVERRIDE,
    );
    observation.observedValueAsString =
      dumpOverrideObservation.dumpOverrideType;
    observation.description = dumpOverrideObservation.description;
    observation.observedEquipmentId =
      dumpOverrideObservation.observedEquipmentId;
    return observation;
  }

  export function mapToValue(
    dumpOverrideType: DumpOverrideType,
    translationFn: (label: string) => string,
  ): any {
    let value = {
      id: -1,
      name: translationFn('undefined'),
      color: CommonConstants.COLOR_DARK_BLUE,
    };
    if (dumpOverrideType === DumpOverrideType.FLAG_CYCLE) {
      value.name = translationFn('flag_cycle_option');
    } else if (dumpOverrideType === DumpOverrideType.SUPPRESS_DUMP) {
      value.name = translationFn('dump_suppress_option');
    }
    return value;
  }

  export function updateIconNameAndType(
    timeData: TimeData,
    dumpOverrideType: DumpOverrideType,
  ): TimeData {
    return {
      ...timeData,
      iconName: dumpOverrideType === DumpOverrideType.FLAG_CYCLE ? 'flag' : '',
      materialIcon: dumpOverrideType === DumpOverrideType.FLAG_CYCLE,
    };
  }
}
