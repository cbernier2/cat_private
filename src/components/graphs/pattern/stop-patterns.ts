import {StopReasonClassification} from '../../../api/types/cat/stop-reason';
import {ColourUtils} from '../../../api/types/cat/colors';
import {CommonConstants} from '../../../api/types/cat/common';

import {PatternType} from './types';

const background = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_OBSERVATION_HATCH_BACKGROUND,
  0.1,
);
const operationalDelayForeground = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_DARK_ORANGE,
  0.4,
);
const maintenanceForeground = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_DARK_RED,
  0.4,
);
const standbyForeground = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_DARK_BLUE,
  0.4,
);

const SiteWideOperationalDelayBackground = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_DARK_ORANGE,
  0.1,
);
const SitewideStandbyBackground = ColourUtils.convertHexToRGBA(
  CommonConstants.COLOR_DARK_BLUE,
  0.1,
);

export const StopReasonPatterns = new Map<string, PatternType>([
  [
    'UNKNOWN',
    {
      background: ColourUtils.convertHexToRGBA(
        CommonConstants.COLOR_YELLOW_ORANGE,
        0.7,
      ),
      pattern: 'none',
    },
  ],

  [
    `BG_${StopReasonClassification.OPERATIONAL_DELAY}`,
    {
      background: SiteWideOperationalDelayBackground,
      pattern: 'none',
    },
  ],

  [
    `BG_${StopReasonClassification.STANDBY}`,
    {
      background: SitewideStandbyBackground,
      pattern: 'none',
    },
  ],

  [
    `OB_${StopReasonClassification.OPERATIONAL_DELAY}`,
    {
      background,
      pattern: 'OBSERVATION',
      foreground: operationalDelayForeground,
    },
  ],

  [
    `OB_${StopReasonClassification.SCHEDULED_MAINTENANCE}`,
    {
      background,
      pattern: 'OBSERVATION',
      foreground: maintenanceForeground,
    },
  ],

  [
    `OB_${StopReasonClassification.STANDBY}`,
    {
      background,
      pattern: 'OBSERVATION',
      foreground: standbyForeground,
    },
  ],

  [
    `OB_${StopReasonClassification.UNSCHEDULED_MAINTENANCE}`,
    {
      background,
      pattern: 'OBSERVATION',
      foreground: maintenanceForeground,
    },
  ],

  [
    `SW_${StopReasonClassification.OPERATIONAL_DELAY}`,
    {
      background: CommonConstants.COLOR_DARK_ORANGE,
      pattern: 'none',
    },
  ],

  [
    `SW_${StopReasonClassification.STANDBY}`,
    {
      background: CommonConstants.COLOR_DARK_BLUE,
      pattern: 'none',
    },
  ],

  [
    `TL_${StopReasonClassification.OPERATIONAL_DELAY}`,
    {
      background: operationalDelayForeground,
      pattern: 'none',
    },
  ],

  [
    `TL_${StopReasonClassification.SCHEDULED_MAINTENANCE}`,
    {
      background: CommonConstants.COLOR_DARK_RED,
      pattern: 'gradiant',
    },
  ],

  [
    `TL_${StopReasonClassification.STANDBY}`,
    {
      background: CommonConstants.COLOR_DARK_BLUE,
      pattern: 'gradiant',
    },
  ],

  [
    `TL_${StopReasonClassification.UNSCHEDULED_MAINTENANCE}`,
    {
      background: CommonConstants.COLOR_DARK_RED,
      pattern: 'gradiant',
    },
  ],
]);
