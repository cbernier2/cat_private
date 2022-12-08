import {EquipmentOperationalStatus} from './types/cat/common';
import moment from 'moment/moment';
import {ObservationUtils} from './observation';
import {EquipmentSummaryUtils} from './types/cat/production';
import {
  StopReasonClassification,
  StopReasonTypeDO,
} from './types/cat/stop-reason';
import {CatTheme} from '../themes/types';
import {CatEquipmentSummary} from '../redux/site/helpers/transformSummaries';
import {ObservationDO} from './types/cat/observation';
import {Shift, ShiftType} from './types/cat/shift';
import {findShiftType} from './shift';

export const getEquipmentStatusColor = (
  equipmentSummary: CatEquipmentSummary,
  currentShift: Shift | null,
  observations: ObservationDO[],
  stopReasonTypes: StopReasonTypeDO[],
  {colors}: CatTheme,
) => {
  if (!currentShift || !equipmentSummary || stopReasonTypes.length === 0) {
    return colors.grey100;
  }
  const now = moment().valueOf();
  const atTime =
    findShiftType(now, currentShift) !== ShiftType.HISTORICAL
      ? now
      : currentShift.endTime;
  const operationalStatus = ObservationUtils.findEquipmentOperationalStatus(
    observations,
    equipmentSummary.id,
    atTime,
    observation =>
      stopReasonTypes.find(
        stopReasonType => stopReasonType.id === observation.observedValueId,
      ) ?? stopReasonTypes[0],
  );
  if (operationalStatus !== EquipmentOperationalStatus.UP) {
    return colors.error;
  }
  const stopReasonTypeId =
    EquipmentSummaryUtils.findStopReasonTypeIdAtTime(
      equipmentSummary,
      atTime,
    ) ?? null;
  const stopReasonType =
    stopReasonTypes.find(it => it.id === stopReasonTypeId) ?? null;
  if (stopReasonType === null) {
    return colors.grey100;
  }
  switch (stopReasonType.classification) {
    case StopReasonClassification.STANDBY:
      return colors.secondary;
    case StopReasonClassification.OPERATIONAL_DELAY:
      return colors.errorCaution0;
    case StopReasonClassification.UNSCHEDULED_MAINTENANCE:
    case StopReasonClassification.SCHEDULED_MAINTENANCE:
      return colors.error;
  }
};
