import {createSelector} from '@reduxjs/toolkit';
import moment from 'moment';

import {ConfigItemName} from '../../api/types/cat/config-item';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import {CatPersons, SiteConfig} from '../../api/types';
import {
  ObservationDO,
  ObservationType,
  ObservationWithReasonType,
} from '../../api/types/cat/observation';

import {RootState} from '../index';

import {
  CatAreaSummary,
  CatEquipmentSummary,
  CatEquipmentSummaryWithObservations,
  CatRouteSummary,
  CatSummaries,
} from './helpers/transformSummaries';
import {CurrentArea, CurrentEquipment} from './site-slice';
import {CatHaulCycle} from '../../api/types/haul-cycle';
import {StopReasonTypeDO} from '../../api/types/cat/stop-reason';

export const lastUpdateSelector = createSelector(
  (state: RootState) => state.site.lastUpdate,
  lastUpdate => lastUpdate && moment(lastUpdate).toDate(),
);

export const routesSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  routes => routes ?? [],
);

export const equipmentsSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries,
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries,
  (state: RootState) => state.site.productionSummary?.supportEquipSummaries,
  (state: RootState) => state.site.productionSummary?.waterTruckSummaries,
  (load, haul, support, water) => [
    ...(load ?? []),
    ...(haul ?? []),
    ...(support ?? []),
    ...(water ?? []),
  ],
);

export const areasSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.loadAreaSummaries,
  (state: RootState) => state.site.productionSummary?.dumpSummaries,
  (load, dump) => [...(load ?? []), ...(dump ?? [])],
);

const returnArea = (
  selectedArea: CurrentArea | null,
  productionSummary: CatSummaries | null,
): CatAreaSummary | null => {
  if (!selectedArea || !productionSummary) {
    return null;
  }

  const {id, type} = selectedArea;
  let summaries: CatAreaSummary[] = [];
  switch (type) {
    case CategoryType.DUMP_AREA:
      summaries =
        (productionSummary.dumpSummaries as unknown as CatAreaSummary[]) ?? [];
      break;
    case CategoryType.LOAD_AREA:
      summaries =
        (productionSummary.loadAreaSummaries as unknown as CatAreaSummary[]) ??
        [];
      break;
  }

  return summaries?.find((summary: any) => summary.id === id) ?? null;
};

export const currentAreaSelector = createSelector(
  (state: RootState) => state.site.currentArea,
  (state: RootState) => state.site.productionSummary,
  returnArea,
);

export const searchAreaSelector = createSelector(
  (state: RootState) => state.site.searchArea,
  (state: RootState) => state.site.productionSummary,
  returnArea,
);

const equipmentTypeToSummary = (
  productionSummary: CatSummaries | undefined,
  categoryType: CategoryType,
) => {
  switch (categoryType) {
    case CategoryType.LOAD_EQUIPMENT:
      return productionSummary?.loadEquipSummaries;
    case CategoryType.HAUL_EQUIPMENT:
      return productionSummary?.haulEquipSummaries;
    case CategoryType.SUPPORT_EQUIPMENT:
      return productionSummary?.supportEquipSummaries;
    case CategoryType.WATER_TRUCK_EQUIPMENT:
      return productionSummary?.waterTruckSummaries;
  }
  return undefined;
};

const returnEquipment = (
  productionSummary: CatSummaries | null,
  selectedEquipment: CurrentEquipment | null,
): CatEquipmentSummary | undefined => {
  if (productionSummary && selectedEquipment) {
    return equipmentTypeToSummary(
      productionSummary,
      selectedEquipment.category,
    )?.find(summary => summary.equipment?.name === selectedEquipment.name);
  } else {
    return undefined;
  }
};

export const currentEquipmentSelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  (state: RootState) => state.site.currentEquipment,
  returnEquipment,
);

export const searchEquipmentSelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  (state: RootState) => state.site.searchEquipment,
  returnEquipment,
);

export type EquipmentSelector =
  | typeof currentEquipmentSelector
  | typeof searchEquipmentSelector;

const returnRoute = (
  routeSummaries: CatRouteSummary[] | undefined,
  selectedRoute: string | null,
): CatRouteSummary | undefined => {
  if (routeSummaries && selectedRoute) {
    return routeSummaries.find(
      routeSummary => routeSummary.route.name === selectedRoute,
    );
  } else {
    return undefined;
  }
};

export const currentRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.currentRouteName,
  returnRoute,
);

export const searchRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.searchRouteName,
  returnRoute,
);

export type RouteSelector =
  | typeof currentRouteSelector
  | typeof searchRouteSelector;

export const personsSelector = createSelector(
  (state: RootState) => state.site.persons,
  persons => persons,
);

export const operatorsSelector = createSelector(
  personsSelector,
  (state: RootState) => state.site.operatorInfo,
  (persons, operatorInfo): CatPersons =>
    persons
      .filter(person => person.isOperator)
      .map(person => ({...person, operatorInfo: operatorInfo[person.id]})),
);

export const siteIsLoadingSelector = createSelector(
  (state: RootState) => state.site.loading,
  loading => loading,
);

export const currentShiftSelector = createSelector(
  (state: RootState) => state.site.currentShift,
  currentShift => currentShift,
);

export const currentShiftLabelSelector = createSelector(
  (state: RootState) => state.site.currentShift,
  currentShift => {
    if (currentShift) {
      const date = moment(currentShift.startTime).format('DD MMM');
      return `${date} ${currentShift.templateName} (${currentShift.crew})`;
    }
    return null;
  },
);

export const materialsSelector = createSelector(
  (state: RootState) => state.site.materials,
  materials => materials,
);

export const observationsSelector = (state: RootState) =>
  state.site.observations;

export const stopReasonTypesSelector = (state: RootState) =>
  state.site.stopReasonTypes;

export const shiftNominalOperationalTimelineSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift?.nominalOperationalTimeline ?? [],
);

export const shiftEndTimeSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift?.endTime,
);

export const shiftStartTimeSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift?.startTime,
);

export const createSiteConfigsSelector = (
  name: ConfigItemName,
  defaultValue: any = null,
) =>
  createSelector(
    (state: RootState) => state.site.siteConfig,
    (siteConfig: SiteConfig) => {
      return siteConfig[name] ?? defaultValue;
    },
  );

export const siteClockIs24HourSelector = createSiteConfigsSelector(
  ConfigItemName.SETTINGS_LOCALIZATION_TIME_FORMAT_24HOUR,
);
export const systemUnitTypeSelector = createSiteConfigsSelector(
  ConfigItemName.PRODUCTION_UNIT_TYPE,
  CommonConstants.DEFAULT_UNIT_TYPE_VALUE,
);

export const StopReasonTypesSelector = createSelector(
  (state: RootState) => state.site.stopReasonTypes,
  stopReasonTypes => stopReasonTypes,
);

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
  (state: RootState) => state.site.observations,
  StopReasonTypesSelector,
  (equipment, observations, stopReasonTypes) =>
    selectObservationsWithReasonType(
      equipment?.id ?? '',
      observations,
      stopReasonTypes,
    ),
);

export const siteObservationsSelector = createSelector(
  (state: RootState) => state.site.observations,
  StopReasonTypesSelector,
  (observations, stopReasonTypes) =>
    selectObservationsWithReasonType(
      CommonConstants.UNDEFINED_UUID,
      observations,
      stopReasonTypes,
    ).filter(obs => obs.reasonType?.siteWide),
);

export const siteEquipmentsSelector = createSelector(
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
  (state: RootState) => state.site.observations,
  StopReasonTypesSelector,
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

export const haulCyclesEquipmentSelector = createSelector(
  (state: RootState, haulCycles: CatHaulCycle[]) => haulCycles,
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries,
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries,
  (haulCycles, loadEquipSummaries, haulEquipSummaries) => {
    const loadEquipmentsIds = new Set();
    const haulEquipmentsIds = new Set();
    haulCycles.forEach(haulCycle => {
      loadEquipmentsIds.add(haulCycle.loadEquipment);
      haulEquipmentsIds.add(haulCycle.haulEquipment);
    });
    const getEquipSummaries = (
      ids: typeof loadEquipmentsIds,
      summaries: typeof loadEquipSummaries,
      categoryType: CategoryType,
    ) => {
      return (
        summaries?.filter(summary =>
          ids.has(summary.equipment?.id ?? CommonConstants.UNDEFINED_UUID),
        ) ?? []
      )
        .sort((a, b) =>
          (a.equipment?.name ?? '').localeCompare(b.equipment?.name ?? ''),
        )
        .map(summary => ({
          ...summary,
          categoryType: categoryType,
        }));
    };
    return [
      ...getEquipSummaries(
        loadEquipmentsIds,
        loadEquipSummaries,
        CategoryType.LOAD_EQUIPMENT,
      ),
      ...getEquipSummaries(
        haulEquipmentsIds,
        haulEquipSummaries,
        CategoryType.HAUL_EQUIPMENT,
      ),
    ];
  },
);
