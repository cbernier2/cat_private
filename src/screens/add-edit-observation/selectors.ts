// Base on src/common/pages/equipment-manage/stop-reason/equipment-manage-stop-reason.page.ts

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {CommonConstants} from '../../api/types/cat/common';
import {ObjectUtils} from '../../utils/object-utils';
import {EquipmentType, EquipmentTypeUtils} from '../../api/types/cat/equipment';
import {StopReasonTypeDO} from '../../api/types/cat/stop-reason';
import {AddEditObservationParams} from './types';
import {CatDropDownType} from '../../components/drop-down/types';
import moment from 'moment';
import {TimeOption} from '../../api/types/cat/time-option';
import {findShiftType} from '../../api/shift';
import {Shift, ShiftType} from '../../api/types/cat/shift';
import {DateUtils} from '../../utils/date-utils';
import {t} from 'i18next';
import {
  currentShiftSelector,
  equipmentsSelector,
  observationsSelector,
} from '../../redux/site/site-selectors';
import {ObservationDO} from '../../api/types/cat/observation';

export const canAssignToManageObject = (
  stopReasonType: StopReasonTypeDO,
  currentEquipmentType: EquipmentType | undefined,
) => {
  return ObjectUtils.isValid(
    stopReasonType.equipmentTypes.find(
      equipmentType =>
        equipmentType ===
        EquipmentTypeUtils.toUnifiedEquipmentType(currentEquipmentType),
    ),
  );
};

export const getTimeOptionValue = (
  currentShift: Shift,
  timeOption: TimeOption,
  customValue?: number,
  observation?: ObservationDO,
  observations?: ObservationDO[],
) => {
  if (timeOption === TimeOption.CUSTOM) {
    return customValue;
  }
  const now = moment().valueOf();
  switch (timeOption) {
    case TimeOption.NOW:
      return now;
    case TimeOption.START_OF_SHIFT:
      return currentShift.startTime;
    case TimeOption.THIRTY_MIN_AGO:
      return now - 30 * 60 * 1000;
    case TimeOption.ONE_HOUR_AGO:
      return now - 60 * 60 * 1000;
    case TimeOption.END_OF_SHIFT:
      return currentShift.endTime;
    case TimeOption.SNAP_TO_PREVIOUS:
      if (observations && observation) {
        // Find other observation manage with a start time less than the start time of the selected observation,
        // and an end time less than the end time of the selected observation
        let previousObs = observations.filter(
          value =>
            !value.deleted &&
            value.id !== observation.id &&
            value.startTime < observation.startTime &&
            value.endTime < observation.endTime,
        );

        if (previousObs.length > 0) {
          // Sort previous observations by start time in descending order to find the nearest observation
          previousObs.sort((o1, o2) => o2.startTime - o1.endTime);
          // Return the end time of the nearest observation
          return previousObs[0].endTime;
        }
      }
      return currentShift.startTime;
    case TimeOption.SNAP_TO_NEXT:
      if (observations && observation) {
        // Find other observation manage with a start time less than the start time of the selected observation,
        // and an end time less than the end time of the selected observation
        let previousObs = observations.filter(
          value =>
            !value.deleted &&
            value.id !== observation.id &&
            value.startTime > observation.endTime &&
            value.endTime > observation.endTime,
        );

        if (previousObs.length > 0) {
          // Sort previous by start time in descending order to find the nearest observation
          previousObs.sort((o1, o2) => o1.startTime - o2.endTime);
          // Return the end time of the nearest observation
          return previousObs[0].startTime;
        }
      }
      return currentShift.endTime;
    case TimeOption.ON_GOING:
      return DateUtils.MAX_TIMESTAMP_VALUE;
  }
};

const timeOptionsToDropDownList = (
  timeOptions: TimeOption[],
): CatDropDownType['list'] => {
  return timeOptions.map(timeOption => ({
    label: t('cat.' + timeOption),
    value: timeOption,
  }));
};

const getStartTimeOptions = (currentShift: Shift, includeNow?: boolean) => {
  const now = moment().valueOf();
  let shiftType = findShiftType(now, currentShift);
  let timeOptions: TimeOption[] = [];
  if (shiftType === ShiftType.CURRENT) {
    if (includeNow) {
      timeOptions.push(TimeOption.NOW);
    }
    timeOptions.push(TimeOption.START_OF_SHIFT);
    timeOptions.push(TimeOption.SNAP_TO_PREVIOUS);
    timeOptions.push(TimeOption.THIRTY_MIN_AGO);
    timeOptions.push(TimeOption.ONE_HOUR_AGO);
    timeOptions.push(TimeOption.CUSTOM);
  } else {
    timeOptions.push(TimeOption.START_OF_SHIFT);
    timeOptions.push(TimeOption.SNAP_TO_PREVIOUS);
    timeOptions.push(TimeOption.CUSTOM);
  }
  return timeOptionsToDropDownList(timeOptions);
};

const getEndTimeOptions = (
  currentShift: Shift,
  observation?: ObservationDO,
) => {
  const now = moment().valueOf();
  let shiftType = findShiftType(now, currentShift);
  let timeOptions: TimeOption[] =
    shiftType === ShiftType.CURRENT
      ? [
          TimeOption.NOW,
          TimeOption.END_OF_SHIFT,
          TimeOption.SNAP_TO_NEXT,
          TimeOption.THIRTY_MIN_AGO,
          TimeOption.ONE_HOUR_AGO,
          TimeOption.CUSTOM,
        ]
      : [TimeOption.END_OF_SHIFT, TimeOption.SNAP_TO_NEXT, TimeOption.CUSTOM];
  if (shiftType === ShiftType.CURRENT && observation && observation.id) {
    timeOptions.push(TimeOption.ON_GOING);
  }
  return timeOptionsToDropDownList(timeOptions);
};

export const addEditObservationSelector = createSelector(
  (state: RootState, params: AddEditObservationParams) => params?.equipmentId,
  (state: RootState, params: AddEditObservationParams) => params?.observationId,
  equipmentsSelector,
  observationsSelector,
  (state: RootState) => state.site.stopReasonTypes,
  currentShiftSelector,
  (
    equipmentId,
    observationId,
    equipmentSummaries,
    observations,
    stopReasonTypes,
    currentShift,
  ) => {
    const observation = observations.find(it => it.id === observationId);
    if (observation) {
      equipmentId = observation.observedEquipmentId;
    }

    const equipmentSummary =
      equipmentId &&
      equipmentSummaries.find(summary => summary.equipment?.id === equipmentId);

    if (!equipmentSummary || !currentShift) {
      return null;
    }

    const stopReasons = stopReasonTypes
      .filter(
        stopReasonType =>
          stopReasonType.id !== CommonConstants.UNDEFINED_TERRAIN_DELAY_UUID &&
          (stopReasonType.siteWide ||
            canAssignToManageObject(
              stopReasonType,
              equipmentSummary.equipment?.type,
            )),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(stopReasonType => ({
        label: stopReasonType.name,
        value: stopReasonType.id,
      }));

    return {
      currentShift,
      equipmentSummary,
      observations,
      observation,
      startTimeOptions: getStartTimeOptions(currentShift, true),
      endTimeOptions: getEndTimeOptions(currentShift),
      stopReasons,
    };
  },
);
