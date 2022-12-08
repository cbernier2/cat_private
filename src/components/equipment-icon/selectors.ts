import {createSelector} from '@reduxjs/toolkit';
import {CatEquipmentSummary} from '../../redux/site/helpers/transformSummaries';
import {
  currentShiftSelector,
  observationsSelector,
  stopReasonTypesSelector,
} from '../../redux/site/site-selectors';
import {themeSelector} from '../../redux/app/app-selectors';
import {RootState} from '../../redux';
import {
  countObservationsForEquipment,
  getEquipmentStatusColor,
} from '../../api/equipment';

export const equipmentIconDataSelector = createSelector(
  (_: RootState, equipmentSummary: CatEquipmentSummary) => equipmentSummary,
  currentShiftSelector,
  observationsSelector,
  stopReasonTypesSelector,
  themeSelector,
  (equipmentSummary, currentShift, observations, stopReasonTypes, theme) => {
    return {
      statusColor: getEquipmentStatusColor(
        equipmentSummary,
        currentShift,
        observations,
        stopReasonTypes,
        theme,
      ),
      observationCount: countObservationsForEquipment(
        equipmentSummary,
        currentShift,
        observations,
      ),
    };
  },
);
