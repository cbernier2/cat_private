/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/utils/observation-utils.ts
 * Edited for lint/prettier fixes and imports
 */

import {v4 as uuidv4} from 'uuid';

import {ObservationDO, ObservationType} from './types/cat/observation';
import {ObjectUtils} from '../utils/object-utils';
import {
  CommonConstants,
  EquipmentOperationalStatus,
  PlanAreaProductionStatus,
} from './types/cat/common';
import {
  StopReasonClassification,
  StopReasonTypeDO,
  StopReasonTypeUtils,
} from './types/cat/stop-reason';
import {ObservationManage} from './types/cat/observation-manage';
import {cloneDeep} from 'lodash';
import {Timeline} from './types/cat/production';
import moment from 'moment';

export namespace ObservationUtils {
  export function adjustObservation(
    newObservation: ObservationDO,
    observations: ObservationDO[],
  ): ObservationDO[] {
    if (observations.length === 0) {
      return [newObservation];
    } else {
      const preObservations = observations.filter(
        value => value.startTime <= newObservation.startTime,
      );
      const postObservations = observations.filter(
        value => value.startTime > newObservation.startTime,
      );
      const preObservation: ObservationDO | null =
        preObservations.length >= 1 ? preObservations[0] : null;
      const postObservation: ObservationDO | null =
        postObservations.length >= 1 ? postObservations[0] : null;
      return mergeOrSplitObservation(
        newObservation,
        preObservation,
        postObservation,
      );
    }
  }

  function mergeOrSplitObservation(
    newObservation: ObservationDO,
    preObservation: ObservationDO | null,
    postObservation: ObservationDO | null,
  ): ObservationDO[] {
    let mergeResult: ObservationDO[] = [];
    if (
      preObservation === null &&
      postObservation === null &&
      !hasDefaultObservedValue(newObservation)
    ) {
      return [newObservation];
    } else {
      if (preObservation !== null) {
        mergeResult = mergeOnOrBeforeTimeObservation(
          preObservation,
          newObservation,
        );
      }

      let latestObservation: ObservationDO = Object.assign({}, newObservation);

      // get extendPreObservation
      if (mergeResult.length > 1) {
        latestObservation =
          mergeResult.find(
            value =>
              value.id !== preObservation?.id && value.id !== newObservation.id,
          ) ?? latestObservation;
      }

      if (postObservation !== null) {
        mergeResult = mergeResult.concat(
          postObservation.startTime <= latestObservation.startTime
            ? mergeOnOrBeforeTimeObservation(postObservation, latestObservation)
            : mergeAfterTimeObservation(postObservation, latestObservation),
        );
      }

      let map: Map<string, ObservationDO> = new Map();
      mergeResult.forEach(value => {
        // final validation step & remove duplicate
        if (value.startTime <= value.endTime) {
          map.set(value.id, value);
        }
      });
      return Array.from(map.values());
    }
  }

  function mergeOnOrBeforeTimeObservation(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): ObservationDO[] {
    let mergeResult: ObservationDO[] = [];

    if (canDeletePreObservation(preObservation, newObservation)) {
      preObservation.deleteForever = true;
      mergeResult.push(preObservation);
    } else if (canMergePreObservation(preObservation, newObservation)) {
      if (preObservation.endTime < newObservation.endTime) {
        preObservation.endTime = newObservation.endTime;
        preObservation.observedValueAsString =
          newObservation.observedValueAsString;
        preObservation.observedValueId = newObservation.observedValueId;
        preObservation.lastUpdateTime = moment().valueOf();
      }
      mergeResult.push(preObservation);
    } else if (preObservationDoesNotOverLap(preObservation, newObservation)) {
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
    } else if (
      canMovePreObservationAheadInTime(preObservation, newObservation)
    ) {
      preObservation.startTime = newObservation.endTime;
      preObservation.lastUpdateTime = moment().valueOf();
      mergeResult.push(preObservation);
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
    } else if (canShrinkPreObservation(preObservation, newObservation)) {
      preObservation.endTime = newObservation.startTime;
      preObservation.lastUpdateTime = moment().valueOf();
      mergeResult.push(preObservation);
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
    } else if (canSplitPreObservation(preObservation, newObservation)) {
      // split preObservation into two
      // extendPreObservation should be moved ahead in timeline
      let extendPreObservation = Object.assign({}, preObservation);
      extendPreObservation.id = uuidv4();
      extendPreObservation.lastUpdateTime = moment().valueOf();
      extendPreObservation.startTime = newObservation.endTime;
      extendPreObservation.endTime = preObservation.endTime;
      extendPreObservation.observedValueId = preObservation.observedValueId;
      preObservation.endTime = newObservation.startTime;
      preObservation.lastUpdateTime = moment().valueOf();
      mergeResult.push(preObservation);
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
      mergeResult.push(extendPreObservation);
    }
    return mergeResult;
  }

  function preObservationDoesNotOverLap(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return preObservation.endTime <= newObservation.startTime;
  }

  function hasDefaultObservedValue(observation: ObservationDO): boolean {
    return (
      ObjectUtils.isValid(observation) &&
      ((observation.observationType ===
        ObservationType.PLAN_AREA_PRODUCTION_STATUS &&
        observation.observedValueAsString === PlanAreaProductionStatus.OPEN) ||
        (observation.observationType === ObservationType.STOP_REASON_TYPE &&
          ObjectUtils.isNotValid(observation.observedValueId)))
    );
  }

  function canDeletePreObservation(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return (
      !hasDefaultObservedValue(preObservation) &&
      hasDefaultObservedValue(newObservation) &&
      preObservation.startTime === newObservation.startTime &&
      preObservation.endTime <= newObservation.endTime
    );
  }

  function canMovePreObservationAheadInTime(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return (
      preObservation.startTime === newObservation.startTime &&
      preObservation.endTime > newObservation.endTime
    );
  }

  function canShrinkPreObservation(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return (
      preObservation.startTime < newObservation.startTime &&
      preObservation.endTime <= newObservation.endTime
    );
  }

  function canSplitPreObservation(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return preObservation.endTime > newObservation.endTime;
  }

  function canMergePreObservation(
    preObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    if (
      !hasDefaultObservedValue(preObservation) &&
      !hasDefaultObservedValue(newObservation) &&
      preObservation.observationType === newObservation.observationType
    ) {
      return hasSameObservedValue(preObservation, newObservation)
        ? !(preObservation.endTime < newObservation.startTime)
        : preObservation.startTime === newObservation.startTime &&
            preObservation.endTime <= newObservation.endTime;
    }
    return false;
  }

  function mergeAfterTimeObservation(
    postObservation: ObservationDO,
    newObservation: ObservationDO,
  ): ObservationDO[] {
    let mergeResult: ObservationDO[] = [];
    if (canDeletePostObservation(postObservation, newObservation)) {
      postObservation.deleteForever = true;
      mergeResult.push(postObservation);
    } else if (canMergePostObservation(postObservation, newObservation)) {
      postObservation.startTime = newObservation.startTime;
      if (newObservation.endTime > postObservation.endTime) {
        postObservation.endTime = newObservation.endTime;
        postObservation.observedValueAsString =
          newObservation.observedValueAsString;
        postObservation.observedValueId = newObservation.observedValueId;
      }
      postObservation.lastUpdateTime = moment().valueOf();
      mergeResult.push(postObservation);
    } else if (
      canMovePostObservationAheadInTime(postObservation, newObservation)
    ) {
      postObservation.startTime = newObservation.endTime;
      postObservation.lastUpdateTime = moment().valueOf();
      mergeResult.push(postObservation);
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
    } else if (
      isPostObservationDoesNotOverLap(postObservation, newObservation)
    ) {
      if (!hasDefaultObservedValue(newObservation)) {
        mergeResult.push(newObservation);
      }
    }
    return mergeResult;
  }

  function canDeletePostObservation(
    postObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return (
      !hasDefaultObservedValue(postObservation) &&
      hasDefaultObservedValue(newObservation) &&
      postObservation.endTime <= newObservation.endTime
    );
  }

  function canMovePostObservationAheadInTime(
    postObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return postObservation.startTime < newObservation.endTime;
  }

  function isPostObservationDoesNotOverLap(
    postObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    return postObservation.startTime >= newObservation.endTime;
  }

  function canMergePostObservation(
    postObservation: ObservationDO,
    newObservation: ObservationDO,
  ): boolean {
    if (
      !hasDefaultObservedValue(postObservation) &&
      !hasDefaultObservedValue(newObservation) &&
      postObservation.observationType === newObservation.observationType
    ) {
      return hasSameObservedValue(postObservation, newObservation)
        ? postObservation.startTime <= newObservation.endTime
        : postObservation.startTime <= newObservation.endTime &&
            postObservation.endTime <= newObservation.endTime;
    }
    return false;
  }

  function hasSameObservedValue(
    observation1: ObservationDO,
    observation2: ObservationDO,
  ): boolean {
    if (observation1.observationType === observation2.observationType) {
      return observation1.observationType ===
        ObservationType.PLAN_AREA_PRODUCTION_STATUS
        ? observation1.observedValueAsString ===
            observation2.observedValueAsString
        : observation1.observedValueId === observation2.observedValueId;
    }
    return false;
  }

  export function compareStartTime(
    observation1: ObservationDO,
    observation2: ObservationDO,
  ): number {
    if (observation2.startTime > observation1.startTime) {
      return 1;
    }
    if (observation2.startTime < observation1.startTime) {
      return -1;
    }
    return 0;
  }

  export function compareLastUpdateTime(
    observation1: ObservationDO,
    observation2: ObservationDO,
  ): number {
    if (observation2.lastUpdateTime > observation1.lastUpdateTime) {
      return 1;
    }
    if (observation2.lastUpdateTime < observation1.lastUpdateTime) {
      return -1;
    }
    return 0;
  }

  export function isActiveAtTime(
    observation: ObservationDO,
    atTime: number,
  ): boolean {
    return observation.startTime <= atTime && observation.endTime >= atTime;
  }

  export function findEquipmentOperationalStatus(
    observations: ObservationDO[],
    equipmentId: string,
    atTime: number,
    stopReasonTypeFn: (observation: ObservationDO) => StopReasonTypeDO,
  ): EquipmentOperationalStatus {
    let statuses: EquipmentOperationalStatus[] =
      findActiveMaintenanceObservations(
        observations,
        equipmentId,
        atTime,
        stopReasonTypeFn,
      ).map((observation: ObservationDO) =>
        StopReasonTypeUtils.mapToEquipmentOperationalStatus(
          stopReasonTypeFn(observation),
        ),
      );
    return statuses.length > 0 ? statuses[0] : EquipmentOperationalStatus.UP;
  }

  export function findActiveMaintenanceObservations(
    observations: ObservationDO[],
    equipmentId: string,
    atTime: number,
    stopReasonTypeFn: (observation: ObservationDO) => StopReasonTypeDO,
  ): ObservationDO[] {
    return (observations || [])
      .filter(
        (observation: ObservationDO) =>
          observation.observationType === ObservationType.STOP_REASON_TYPE &&
          StopReasonTypeUtils.isMaintenanceType(
            stopReasonTypeFn(observation),
          ) &&
          observation.observedEquipmentId === equipmentId &&
          isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2));
  }

  export function findStopReasonTypeId(
    observations: ObservationDO[],
    equipmentId: string,
    atTime: number,
  ): string | null {
    let stopReasonTypeIds = (observations || [])
      .filter(
        (observation: ObservationDO) =>
          observation.observationType === ObservationType.STOP_REASON_TYPE &&
          observation.observedEquipmentId === equipmentId &&
          isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2))
      .map(
        (observation: ObservationDO) =>
          observation.observedValueId ?? CommonConstants.UNDEFINED_UUID,
      );
    return stopReasonTypeIds.length > 0 ? stopReasonTypeIds[0] : null;
  }

  export function findEquipmentOperatorId(
    observations: ObservationDO[],
    equipmentId: string,
    atTime: number,
  ): string {
    let operatorIds = (observations || [])
      .filter(
        (observation: ObservationDO) =>
          observation.observationType === ObservationType.OPERATOR &&
          observation.observedEquipmentId === equipmentId,
      )
      .filter((observation: ObservationDO) =>
        isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2))
      .map(
        (observation: ObservationDO) =>
          observation.observedValueId ?? CommonConstants.UNDEFINED_UUID,
      );
    return operatorIds.length > 0
      ? operatorIds[0]
      : CommonConstants.UNDEFINED_UUID;
  }

  export function findPlanAreaProductionStatus(
    observations: ObservationDO[],
    planAreaId: string,
    atTime: number,
  ): PlanAreaProductionStatus {
    let statuses: PlanAreaProductionStatus[] = (observations || [])
      .filter(
        (observation: ObservationDO) =>
          observation.observationType ===
            ObservationType.PLAN_AREA_PRODUCTION_STATUS &&
          observation.observedPlanAreaId === planAreaId &&
          isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2))
      .map(
        (observation: ObservationDO) =>
          observation.observedValueAsString as PlanAreaProductionStatus,
      );
    return statuses.length > 0 ? statuses[0] : PlanAreaProductionStatus.OPEN;
  }

  export function findMaintenanceObservations(
    observations: ObservationDO[],
    stopReasonTypeFunction: (observation: ObservationDO) => StopReasonTypeDO,
    equipmentId?: string,
  ): ObservationDO[] {
    return observations.filter(observation => {
      if (equipmentId && observation.observedEquipmentId !== equipmentId) {
        return false;
      } else if (
        observation.observationType === ObservationType.STOP_REASON_TYPE
      ) {
        let stopReasonType = stopReasonTypeFunction(observation);
        return (
          stopReasonType &&
          (stopReasonType.classification ===
            StopReasonClassification.SCHEDULED_MAINTENANCE ||
            stopReasonType.classification ===
              StopReasonClassification.UNSCHEDULED_MAINTENANCE)
        );
      }
      return false;
    });
  }

  export function findByStopReasonClassification(
    observations: ObservationDO[],
    equipmentId: string,
    stopReasonClassification: StopReasonClassification,
    stopReasonTypeFunction: (observation: ObservationDO) => StopReasonTypeDO,
  ): ObservationDO[] {
    return observations.filter(observation => {
      if (
        observation.observedEquipmentId === equipmentId &&
        observation.observationType === ObservationType.STOP_REASON_TYPE
      ) {
        let stopReasonType = stopReasonTypeFunction(observation);
        return (
          stopReasonType &&
          stopReasonType.classification === stopReasonClassification
        );
      }
      return false;
    });
  }

  export function findByObservationType(
    observations: ObservationDO[],
    observationType: ObservationType,
  ): ObservationDO[] {
    const obs = (observations || [])
      .filter(
        (observation: ObservationDO) =>
          observationType === observation.observationType,
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2));
    return obs;
  }

  export function findByObservationTypeAndAtTime(
    observations: ObservationDO[],
    observationType: ObservationType,
    atTime: number,
  ): ObservationDO[] {
    return findByObservationType(observations, observationType)
      .filter((observation: ObservationDO) =>
        isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2));
  }

  export function findActiveAtTime(
    observations: ObservationDO[],
    atTime: number,
  ): ObservationDO | null {
    const obs = observations
      .filter((observation: ObservationDO) =>
        isActiveAtTime(observation, atTime),
      )
      .sort((o1, o2) => compareLastUpdateTime(o1, o2));
    return obs.length ? obs[0] : null;
  }

  // This function assumes, higher index value is given more precedence over lower one
  export function adjustOverLappingValues(
    observations: ObservationDO[],
  ): ObservationDO[] {
    // clone observations first as observation state can be mutated
    let clonedObservations: ObservationDO[] = cloneDeep(observations);
    let result: ObservationDO[] = [];
    for (
      let observationIndex = 0;
      observationIndex < clonedObservations.length;
      observationIndex++
    ) {
      let observation = clonedObservations[observationIndex];
      let obs = clonedObservations
        .filter(
          (value, index) =>
            value.id !== observation.id &&
            index < observationIndex &&
            isOverLap(value, observation),
        )
        .sort((o1, o2) => compareLastUpdateTime(o2, o1));
      // check for full overlap
      result = result.filter(r => !isFullOverLap(r, observation));
      let overLapped: ObservationDO | null = obs.length ? obs[0] : null;
      if (overLapped) {
        if (isStartTimeOverLap(overLapped, observation)) {
          overLapped.endTime = observation.startTime;
        } else if (isEndTimeOverLap(overLapped, observation)) {
          overLapped.startTime = observation.endTime;
        } else if (isFullOverLap(overLapped, observation)) {
          result = result.filter(r => r.id !== overLapped?.id);
        } else if (isFullOverLapAndSplit(overLapped, observation)) {
          let newObservation: ObservationDO = Object.assign({}, overLapped);
          overLapped.endTime = observation.startTime;
          newObservation.startTime = observation.endTime;
          // insert into new position, so it's processed in next call
          clonedObservations.splice(observationIndex + 1, 0, newObservation);
        }
      }
      result.push(observation);
    }
    return result.sort((r1, r2) => r1.startTime - r2.startTime);
  }

  export function isOverLap(
    observation1: ObservationDO | Timeline,
    observation2: ObservationDO | Timeline,
  ): boolean {
    return (
      isStartTimeOverLap(observation1, observation2) ||
      isEndTimeOverLap(observation1, observation2) ||
      isFullOverLapAndSplit(observation1, observation2) ||
      isFullOverLap(observation1, observation2)
    );
  }

  export function isStartTimeOverLap(
    observation1: ObservationDO | ObservationManage | Timeline,
    observation2: ObservationDO | ObservationManage | Timeline,
  ): boolean {
    let startTime1 = getStartTime(observation1);
    let startTime2 = getStartTime(observation2);
    let endTime1 = getEndTime(observation1);
    let endTime2 = getEndTime(observation2);
    return (
      startTime2 > startTime1 && startTime2 < endTime1 && endTime2 >= endTime1
    );
  }

  function getStartTime(
    observation: ObservationDO | ObservationManage | Timeline,
  ): number {
    if ('startTimeData' in observation) {
      return observation.startTimeData.time;
    } else {
      return observation.startTime;
    }
  }

  function getEndTime(
    observation: ObservationDO | ObservationManage | Timeline,
  ): number {
    if ('endTimeData' in observation) {
      return observation.endTimeData.time;
    } else {
      return observation.endTime;
    }
  }

  export function isEndTimeOverLap(
    observation1: ObservationDO | ObservationManage | Timeline,
    observation2: ObservationDO | ObservationManage | Timeline,
  ): boolean {
    let startTime1 = getStartTime(observation1);
    let startTime2 = getStartTime(observation2);
    let endTime1 = getEndTime(observation1);
    let endTime2 = getEndTime(observation2);
    return (
      startTime2 <= startTime1 && endTime2 > startTime1 && endTime2 < endTime1
    );
  }

  export function isFullOverLapAndSplit(
    observation1: ObservationDO | ObservationManage | Timeline,
    observation2: ObservationDO | ObservationManage | Timeline,
  ): boolean {
    let startTime1 = getStartTime(observation1);
    let startTime2 = getStartTime(observation2);
    let endTime1 = getEndTime(observation1);
    let endTime2 = getEndTime(observation2);
    return startTime2 > startTime1 && endTime2 < endTime1;
  }

  export function isFullOverLap(
    observation1: ObservationDO | ObservationManage | Timeline,
    observation2: ObservationDO | ObservationManage | Timeline,
  ): boolean {
    let startTime1 = getStartTime(observation1);
    let startTime2 = getStartTime(observation2);
    let endTime1 = getEndTime(observation1);
    let endTime2 = getEndTime(observation2);
    return startTime2 <= startTime1 && endTime2 >= endTime1;
  }

  export function sortStopReasonObservationsByPrecedence(
    observations: ObservationDO[],
    stopReasonTypesMap: Map<string, StopReasonTypeDO>,
  ) {
    if (
      !observations.every(
        o => o.observationType === ObservationType.STOP_REASON_TYPE,
      )
    ) {
      return;
    }

    observations.sort((o1, o2) => {
      const o1StopReasonType = stopReasonTypesMap.get(
        o1.observedValueId ?? CommonConstants.UNDEFINED_UUID,
      );
      const o2StopReasonType = stopReasonTypesMap.get(
        o2.observedValueId ?? CommonConstants.UNDEFINED_UUID,
      );
      const o1maintenance =
        o1StopReasonType &&
        StopReasonTypeUtils.isMaintenanceType(o1StopReasonType);
      const o2maintenance =
        o2StopReasonType &&
        StopReasonTypeUtils.isMaintenanceType(o2StopReasonType);
      if (o1maintenance && !o2maintenance) {
        return 1;
      } else if (o2maintenance && !o1maintenance) {
        return -1;
      } else {
        return o1.lastUpdateTime - o2.lastUpdateTime;
      }
    });
  }
}
