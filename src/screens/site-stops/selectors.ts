import {createSelector} from '@reduxjs/toolkit';

import {
  ObservationDO,
  ObservationType,
  ObservationWithReasonType,
} from '../../api/types/cat/observation';
import {StopReasonTypeDO} from '../../api/types/cat/stop-reason';
import {RootState} from '../../redux';
import {CommonConstants} from '../../api/types/cat/common';
import {CatEquipmentSummaryWithObservations} from '../../redux/site/helpers/transformSummaries';
import {
  EquipmentSelector,
  observationsSelector,
  stopReasonTypesSelector,
} from '../../redux/site/site-selectors';

const selectObservationsWithReasonType = (
  equipmentId: string,
  observations: ObservationDO[],
  stopReasonTypes: StopReasonTypeDO[],
): ObservationWithReasonType[] =>
  observations
    .filter(
      obs =>
        obs.observedEquipmentId === equipmentId &&
        obs.observationType === ObservationType.STOP_REASON_TYPE,
    )
    .map(obs => ({
      ...obs,
      reasonType: stopReasonTypes.find(rt => rt.id === obs.observedValueId),
    }));

export const currentEquipmentObservationsSelector = createSelector(
  (state: RootState, selector: EquipmentSelector) => selector(state),
  observationsSelector,
  stopReasonTypesSelector,
  (equipment, observations, stopReasonTypes) =>
    selectObservationsWithReasonType(
      equipment?.id ?? '',
      observations,
      stopReasonTypes,
    ),
);

export const equipmentObservationsSelector = createSelector(
  (state: RootState, equipmentId: string | null) => equipmentId,
  observationsSelector,
  stopReasonTypesSelector,
  (equipmentId, observations, stopReasonTypes) => {
    if (equipmentId !== null) {
      return selectObservationsWithReasonType(
        equipmentId,
        observations,
        stopReasonTypes,
      );
    } else {
      return selectObservationsWithReasonType(
        CommonConstants.UNDEFINED_UUID,
        observations,
        stopReasonTypes,
      ).filter(obs => obs.reasonType?.siteWide);
    }
  },
);

export const siteObservationsSelector = createSelector(
  (state: RootState) => state.site.observations,
  stopReasonTypesSelector,
  (observations, stopReasonTypes) =>
    selectObservationsWithReasonType(
      CommonConstants.UNDEFINED_UUID,
      observations,
      stopReasonTypes,
    ).filter(obs => obs.reasonType?.siteWide),
);

const siteEquipmentsSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries,
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries,
  (state: RootState) => state.site.productionSummary?.supportEquipSummaries,
  (state: RootState) => state.site.productionSummary?.waterTruckSummaries,
  (load, haul, support, water) => {
    const sortSummaries = (summaries: typeof load = []) =>
      summaries
        .filter(summary => summary.equipment?.id)
        .sort((a, b) =>
          (a.equipment?.name ?? '').localeCompare(b.equipment?.name ?? ''),
        );

    return sortSummaries([
      ...(load ?? []),
      ...(haul ?? []),
      ...(support ?? []),
      ...(water ?? []),
    ]);
  },
);

export const siteEquipmentsObservationsSelector = createSelector(
  siteEquipmentsSelector,
  observationsSelector,
  stopReasonTypesSelector,
  (
    equipments,
    observations,
    stopReasonTypes,
  ): CatEquipmentSummaryWithObservations[] => {
    return equipments.map(equipment => ({
      ...equipment,
      observations: selectObservationsWithReasonType(
        equipment.id,
        observations,
        stopReasonTypes,
      ),
    }));
  },
);
