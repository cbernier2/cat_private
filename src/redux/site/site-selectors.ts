import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

export const currentShiftSelector = createSelector(
  (state: RootState) => state.site.currentShift,
  currentShift => currentShift!,
);

export const shiftNominalOperationalTimelineSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift.nominalOperationalTimeline,
);

export const shiftEndTimeSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift.endTime,
);

export const shiftStartTimeSelector = createSelector(
  currentShiftSelector,
  currentShift => currentShift.startTime,
);

export const siteConfigsSelector = (name?: string) =>
  createSelector(
    (state: RootState) => state.site.siteConfig,
    siteConfig => {
      if (name && name !== '') {
        return siteConfig.find((config: any) => config.name === name) ?? null;
      }

      return siteConfig;
    },
  );

export const siteTimezoneSelector = createSelector(
  siteConfigsSelector('settings.localization.timezone'),
  timezone => timezone?.value ?? null,
);
