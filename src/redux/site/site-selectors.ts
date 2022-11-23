import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {ConfigItemName} from '../../api/types/cat/config-item';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import moment from 'moment';
import {Material} from '../../api/types/cat/material';
import {SiteConfig} from '../../api/types';
import {RouteUtils} from '../../utils/route';
import {CatSummaries} from './helpers/transformSummaries';

export const lastUpdateSelector = createSelector(
  (state: RootState) => state.site.lastUpdate,
  lastUpdate => lastUpdate && moment(lastUpdate).toDate(),
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
