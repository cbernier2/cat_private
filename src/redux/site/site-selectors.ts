import {createSelector} from '@reduxjs/toolkit';
import moment from 'moment';

import {ConfigItemName} from '../../api/types/cat/config-item';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import {CatPersons, SiteConfig} from '../../api/types';
import {RouteUtils} from '../../utils/route';

import {RootState} from '../index';

import {CatAreaSummary, CatSummaries} from './helpers/transformSummaries';

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

export const currentAreaSelector = (isSearch: boolean) =>
  createSelector(
    (state: RootState) => {
      const selectedArea = isSearch
        ? state.site.searchArea
        : state.site.currentArea;

      if (!selectedArea) {
        return null;
      }

      const {id, type} = selectedArea;
      let summaries: CatAreaSummary[] = [];
      switch (type) {
        // case CategoryType.CRUSHER_AREA:
        //   summaries =
        //     (state.site.productionSummary
        //       ?.crusherSummaries as unknown as CatAreaSummary[]) ?? [];
        //   break;
        case CategoryType.DUMP_AREA:
          summaries =
            (state.site.productionSummary
              ?.dumpSummaries as unknown as CatAreaSummary[]) ?? [];
          break;
        case CategoryType.LOAD_AREA:
          summaries =
            (state.site.productionSummary
              ?.loadAreaSummaries as unknown as CatAreaSummary[]) ?? [];
          break;
      }

      return summaries?.find((summary: any) => summary.id === id) ?? null;
    },
    summary => summary,
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

export const currentEquipmentSelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  (state: RootState) => state.site.currentEquipment,
  (productionSummary, currentEquipment) => {
    if (productionSummary && currentEquipment) {
      return equipmentTypeToSummary(
        productionSummary,
        currentEquipment.category,
      )?.find(summary => summary.equipment?.name === currentEquipment.name);
    } else {
      return undefined;
    }
  },
);

export const searchEquipmentSelector = createSelector(
  (state: RootState) => state.site.productionSummary,
  (state: RootState) => state.site.searchEquipment,
  (productionSummary, searchEquipment) => {
    if (productionSummary && searchEquipment) {
      return equipmentTypeToSummary(
        productionSummary,
        searchEquipment.category,
      )?.find(summary => summary.equipment?.name === searchEquipment.name);
    } else {
      return undefined;
    }
  },
);

export type EquipmentSelector =
  | typeof currentEquipmentSelector
  | typeof searchEquipmentSelector;

export const currentRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.currentRouteName,
  (routeSummaries, selectedRoute) => {
    if (routeSummaries && selectedRoute) {
      return routeSummaries.find(
        routeSummary => routeSummary.route.name === selectedRoute,
      );
    } else {
      return undefined;
    }
  },
);

export const searchRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.searchRouteName,
  (routeSummaries, selectedRoute) => {
    if (routeSummaries && selectedRoute) {
      return routeSummaries.find(
        routeSummary => routeSummary.route.name === selectedRoute,
      );
    } else {
      return undefined;
    }
  },
);

export type RouteSelector =
  | typeof currentRouteSelector
  | typeof searchRouteSelector;

export const currentRouteHaulCycles = (routeSelector: RouteSelector) =>
  createSelector(
    routeSelector,
    (state: RootState) => state.site.haulCycles,
    (selectedRouteSummary, haulCycles) => {
      if (!selectedRouteSummary?.route) {
        return [];
      }
      return haulCycles.filter(haulCycle =>
        RouteUtils.isOnRoute(selectedRouteSummary.route, haulCycle),
      );
    },
  );

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

export const materialsSelector = createSelector(
  (state: RootState) => state.site.materials,
  materials => materials,
);

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
