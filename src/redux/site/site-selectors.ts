import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {ConfigItemName} from '../../api/types/cat/config-item';
import {CommonConstants} from '../../api/types/cat/common';
import moment from 'moment';
import {Material} from '../../api/types/cat/material';
import {SiteConfig} from '../../api/types';

export const lastUpdateSelector = createSelector(
  (state: RootState) => state.site.lastUpdate,
  lastUpdate => lastUpdate && moment(lastUpdate).toDate(),
);

export const currentRouteSelector = createSelector(
  (state: RootState) => state.site.productionSummary?.routeSummaries,
  (state: RootState) => state.site.currentRouteId,
  (routeSummaries, selectedRoute) => {
    if (routeSummaries && selectedRoute) {
      return routeSummaries.find(
        routeSummary => routeSummary.id === selectedRoute,
      );
    } else {
      return undefined;
    }
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
