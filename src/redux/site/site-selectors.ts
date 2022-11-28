import {createSelector} from '@reduxjs/toolkit';
import moment from 'moment';

import {ConfigItemName} from '../../api/types/cat/config-item';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import {Material} from '../../api/types/cat/material';
import {CatPersons, SiteConfig} from '../../api/types';
import {RouteUtils} from '../../utils/route';

import {RootState} from '../index';

import {CatAreaSummary, CatSummaries} from './helpers/transformSummaries';

export const lastUpdateSelector = createSelector(
  (state: RootState) => state.site.lastUpdate,
  lastUpdate => lastUpdate && moment(lastUpdate).toDate(),
);

export const routesSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries ?? [],
  routes => routes,
);

export const equipmentsSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries ?? [],
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries ?? [],
  (state: RootState) =>
    state.site.productionSummary?.supportEquipSummaries ?? [],
  (state: RootState) => state.site.productionSummary?.waterTruckSummaries ?? [],
  (load, haul, support, water) => [...load, ...haul, ...support, ...water],
);

export const areasSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.loadAreaSummaries ?? [],
  (state: RootState) => state.site.productionSummary?.dumpSummaries ?? [],
  (load, dump) => [...load, ...dump],
);

export const currentAreaSelector = createSelector(
  (state: RootState) => {
    if (!state.site.currentArea) {
      return null;
    }

    const {id, type} = state.site.currentArea;
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

export const currentRouteHaulCycles = createSelector(
  currentRouteSelector,
  (state: RootState) => state.site.haulCycles,
  (currentRouteSummary, haulCycles) => {
    if (!currentRouteSummary?.route) {
      return [];
    }
    return haulCycles.filter(haulCycle =>
      RouteUtils.isOnRoute(currentRouteSummary.route, haulCycle),
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
    Object.fromEntries(
      Object.entries(persons)
        .filter(person => person[1].isOperator)
        .map(person => [
          ...person,
          {...person[1], operatorInfo: operatorInfo[person[1].id]},
        ]),
    ),
);

export const siteIsLoadingSelector = createSelector(
  (state: RootState) => state.site.loading,
  loading => loading,
);

export const currentShiftSelector = createSelector(
  (state: RootState) => state.site.currentShift,
  currentShift => currentShift,
);

export const materialsSelector = (ids?: string[]) =>
  createSelector(
    (state: RootState) => state.site.materials,
    (materials: Material[]) => {
      if (ids && ids.length) {
        return materials.filter(material => ids.includes(material.id)) ?? [];
      }

      return materials;
    },
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
