// Copy from Caterpillar Web App: src/common/common-constants.ts

import {Material} from './material';

export const UNDEFINED_VALUE = '--';

/**
 * Unit system constants used in the site which represent unit.UnitSystem
 * instances of the 'MINING_SI' and 'MINING_IMPERIAL' constant unit systems
 */
export const enum UnitSystem {
  IMPERIAL = 'Mining Imperial', // units.MINING_IMPERIAL.name
  METRIC = 'Mining SI', // units.MINING_SI.name
}

/**
 * These are string representations of for the subset of ProductionUnitTypes used
 * supported on the clients.
 *
 * @see minestar.core.model.plan.ProductionUnitType
 */
export const enum UnitType {
  LOAD = 'LOAD',
  MASS = 'MASS',
  VOLUME = 'BANK_VOLUME',
}

export const enum PayloadSourcePolicy {
  DISABLED = 'DISABLED',
  HAULER = 'HAULER',
  LOADER = 'LOADER',
  AVERAGE = 'AVERAGE',
  HIGHEST_SCORE_THEN_HAULER = 'HIGHEST_SCORE_THEN_HAULER',
  HIGHEST_SCORE_THEN_LOADER = 'HIGHEST_SCORE_THEN_LOADER',
  HIGHEST_SCORE_THEN_AVERAGE = 'HIGHEST_SCORE_THEN_AVERAGE',
}

export const enum DipperCountSourcePolicy {
  HAULER = 'HAULER',
  LOADER = 'LOADER',
  HIGHEST_SCORE_THEN_HAULER = 'HIGHEST_SCORE_THEN_HAULER',
  HIGHEST_SCORE_THEN_LOADER = 'HIGHEST_SCORE_THEN_LOADER',
}
// @dynamic

export class CommonConstants {
  public static readonly GRID_COLUMNS = 12;
  public static readonly UNDEFINED_UUID =
    '00000000-0000-0000-0000-000000000000';
  public static readonly UNDEFINED_TERRAIN_DELAY_UUID =
    '00000000-0000-0000-0000-000000000001';
  public static readonly UNKNOWN_VALUE_COLOUR = '#165A7F';
  public static readonly NO_VALUE_COLOUR = '#191E23';
  public static readonly NO_VALUE_ID = '0';
  public static readonly COLOR_GREY_100 = '#F0F5FA';
  public static readonly COLOR_DARK_RED = '#d32f2f';
  public static readonly COLOR_DARK_BLUE = '#0288d1';
  public static readonly COLOR_DARK_ORANGE = '#ff7c00';
  public static readonly COLOR_YELLOW_ORANGE = '#ffad01';
  public static readonly COLOR_OBSERVATION_HATCH_BACKGROUND = '#3C4650';
  public static readonly STOP_REASON_UNKNOWN_ICON_NAME = 'stop_reason_unknown';
  public static readonly ADDITIONAL_ICONS_LOGIN_KEY = 'operatorLoginIconKey';
  public static readonly ADDITIONAL_ICONS_LOGOUT_KEY = 'operatorLogoutIconKey';
  public static readonly ADDITIONAL_ICONS_FUELING_OCCURRED_KEY =
    'fuelingOccurredIconKey';
  public static readonly DEFAULT_EULA_URL =
    'https://www.caterpillar.com/en/legal-notices/minestar-legal.html';

  // Events
  public static readonly EVENT_MENU_TOGGLED = 'menu.toggled';
  public static readonly EVENT_MENU_CLOSED = 'menu.closed';
  public static readonly EVENT_NOTIFICATIONS_TOGGLED = 'notifications.toggled';
  public static readonly EVENT_NETWORK_CONNECTED = 'network.connected';
  public static readonly EVENT_NETWORK_DISCONNECTED = 'network.disconnected';
  public static readonly EVENT_SERVER_CONNECTED = 'server.connected';
  public static readonly EVENT_SERVER_DISCONNECTED = 'server.disconnected';
  public static readonly EVENT_SYNC_COMPLETED = 'sync.completed';
  public static readonly EVENT_TIMEZONE_CHANGED = 'timezone.changed';
  public static readonly EVENT_SERVER_DATA_CHANGED = 'server.data.changed';
  public static readonly EVENT_SITE_CONFIG_CHANGED = 'site.config.changed';
  public static readonly EVENT_BACKGROUND_VECTOR_LAYER_VISIBILITY_CHANGED =
    'backgroundVectorLayer.visibility.changed';
  public static readonly EVENT_CLEAR_CHART_DATA_SELECTED =
    'clear.chart.dataSelected';
  public static readonly EVENT_EQUIPMENT_STOP_REASON_OBSERVATION_UPDATE =
    'event.equipment.stopReason.observation.update';
  public static readonly EVENT_SITE_WIDE_STOP_REASON_OBSERVATION_UPDATE =
    'event.siteWide.stopReason.observation.update';

  public static readonly DIRTY_CHECK_SHIFT_PLAN = 'dirtyCheck.ShiftPlan';
  public static readonly ID = 'id';
  public static readonly STOP_REASON_CLASSIFICATION =
    'stopReasonClassification';
  public static readonly OBSERVED_VALUE_ID = 'observedValueId';
  public static readonly OBSERVED_EQUIPMENT_ID = 'observedEquipmentId';
  public static readonly OBSERVED_PLAN_AREA_ID = 'observedPlanAreaId';
  public static readonly PERSON_ID = 'personId';
  public static readonly SOURCE_TYPE = 'sourceType';
  public static readonly DISPLAY = 'display';
  public static readonly ON_GOING = 'onGoing';
  public static readonly ERROR_CODES = 'errorCodes';

  // UI settings
  public static readonly SNACKBAR_TIMEOUT = 5000;
  public static readonly DEFAULT_TILE_SIZE = 512;
  public static readonly DEFAULT_ZOOM = 1;
  public static readonly DEFAULT_MAX_ZOOM = 10;

  public static readonly DEFAULT_PRODUCTION_MAX_SHIFT_AGE = 130; // days

  public static readonly STYLE_FONT_FAMILY: string = 'Roboto';

  public static readonly SHIFT_DATE_FORMAT: string = 'DD MMM YYYY';

  // The default colour swatch config is also used as the default material
  public static readonly DEFAULT_COLOUR_SWATCH_CONFIG: Material = {
    id: CommonConstants.UNDEFINED_UUID,
    color: '#03a9f4',
    patternColor: null,
    pattern: null,
  };

  public static readonly DEFAULT_PRODUCTION_SUMMARY_PAYLOAD_RESOLUTION_PREFERENCE =
    PayloadSourcePolicy.DISABLED;
  public static readonly DEFAULT_PRODUCTION_SUMMARY_DIPPER_COUNT_RESOLUTION_PREFERENCE =
    DipperCountSourcePolicy.HAULER;

  public static readonly DEFAULT_UNIT_SYSTEM_VALUE = UnitSystem.IMPERIAL;
  public static readonly DEFAULT_UNIT_TYPE_VALUE = UnitType.MASS;
  // NOTE d3 mutates these values so always create a new instance
  // The default doesn't use 24hr hours
  // The first item in this array that returns true will be the format that is used
  public static get MULTITIME_FORMAT(): Array<
    [string, (date: Date) => number | boolean]
  > {
    return [
      ['.%L', d => d.getMilliseconds()],
      [':%S', d => d.getSeconds()],
      ['%H:%M', d => d.getMinutes()],
      ['%H:00', d => d.getHours()],
      ['%a %d', d => d.getDay() && d.getDate() !== 1],
      ['%b %d', d => d.getDate() !== 1],
      ['%B', d => d.getMonth()],
      ['%Y', () => true],
    ];
  }

  // NOTE d3 mutates these values so always create a new instance
  // The default doesn't use 24hr hours
  // The first item in this array that returns true will be the format that is used
  public static get COMPACT_MULTITIME_FORMAT(): Array<
    [string, (date: Date) => number | boolean]
  > {
    return [
      ['.%L', d => d.getMilliseconds()],
      [':%S', d => d.getSeconds()],
      ['%H:%M', d => d.getMinutes()],
      ['%-H', d => d.getHours()],
      ['%a %d', d => d.getDay() && d.getDate() !== 1],
      ['%b %d', d => d.getDate() !== 1],
      ['%B', d => d.getMonth()],
      ['%Y', () => true],
    ];
  }
  public static readonly SLIDER_ROUND_CLASS_NAME: string = 'slider round';
}
// NOTE this is not a 'const' enum because transpiling using our current build process
//      doesn't correctly include/replace the const enum value
export enum Permission {
  PRODUCTION_READ = 'PERMISSION_PRODUCTION_READ',
  PRODUCTION_WRITE = 'PERMISSION_PRODUCTION_WRITE',
  MAP_READ = 'PERMISSION_MAP_READ',
  MAP_WRITE = 'PERMISSION_MAP_WRITE',
  WEB_REPLAY_READ = 'PERMISSION_WEB_REPLAY_READ',
  WEB_REPLAY_WRITE = 'PERMISSION_WEB_REPLAY_WRITE',
  WEB_EXPORTS_READ = 'PERMISSION_WEB_EXPORTS_READ',
  WEB_SETTINGS_READ = 'PERMISSION_WEB_SETTINGS_READ',
  WEB_SETTINGS_WRITE = 'PERMISSION_WEB_SETTINGS_WRITE',
  WEB_SUPPORT_READ = 'PERMISSION_WEB_SUPPORT_READ',
  WEB_SUPPORT_WRITE = 'PERMISSION_WEB_SUPPORT_WRITE',
  EQUIPMENT_READ = 'PERMISSION_EQUIPMENT_READ',
  EQUIPMENT_WRITE = 'PERMISSION_EQUIPMENT_WRITE',
  TASKS_READ = 'PERMISSION_TASKS_READ',
  TASKS_WRITE = 'PERMISSION_TASKS_WRITE',
  PERSON_READ = 'PERMISSION_PERSON_READ',
  PERSON_WRITE = 'PERMISSION_PERSON_WRITE',
  FUSION_MONITOR_READ = 'PERMISSION_FUSION_MONITOR_READ',
  SHIFT_CONTROL_READ = 'PERMISSION_SHIFT_CONTROL_READ',
  SHIFT_CONTROL_WRITE = 'PERMISSION_SHIFT_CONTROL_WRITE',
  STOP_REASON_CLASSIFICATION_READ = 'PERMISSION_STOP_REASON_CLASSIFICATION_READ',
  STOP_REASON_CLASSIFICATION_WRITE = 'PERMISSION_STOP_REASON_CLASSIFICATION_WRITE',
  SURFACE_MANAGER_READ = 'PERMISSION_SURFACE_MANAGER_READ',
  SURFACE_MANAGER_WRITE = 'PERMISSION_SURFACE_MANAGER_WRITE',
  DESIGN_FILE_UPLOAD = 'PERMISSION_DESIGN_FILE_UPLOAD',
  PERMISSION_ADDRESS_SCHEMA_WRITE = 'PERMISSION_ADDRESS_SCHEMA_WRITE',
  PERMISSION_ADDRESS_WRITE = 'PERMISSION_ADDRESS_WRITE',
  PLANNER_READ = 'PERMISSION_PLANNER_READ',
  PLANNER_WRITE = 'PERMISSION_PLANNER_WRITE',
}

/**
 * Common category type strings used throughout the system
 *
 * @see minestar.core.site.rest.common.production.AbstractProductionSummaryDO
 *      for full listing of category types (summary types)
 */
export const enum CategoryType {
  SITE = 'site',
  SITE_LOAD = 'siteLoad',
  SITE_DUMP = 'siteDump',
  LOAD_AREA = 'loadArea',
  LOAD_EQUIPMENT = 'loadEquip',
  MATERIAL = 'material',
  HAUL_EQUIPMENT = 'haulEquip',
  DUMP_AREA = 'dumpArea',
  CRUSHER_AREA = 'crusherArea',
  SUPPORT_EQUIPMENT = 'supportEquip',
  WATER_TRUCK_EQUIPMENT = 'waterTruckEquip',
  ROUTE = 'route',
}

export type AreaType = CategoryType.LOAD_AREA | CategoryType.DUMP_AREA;
export type EquipmentType =
  | CategoryType.LOAD_EQUIPMENT
  | CategoryType.HAUL_EQUIPMENT
  | CategoryType.SUPPORT_EQUIPMENT
  | CategoryType.WATER_TRUCK_EQUIPMENT;

/**
 * A category class used to hold common category details used by the UI
 */
export interface Category {
  type: CategoryType;
  i18n: string;
  unknownI18n: string;
  icon: string;
  summariesKey: string;
  iconClass: string;
}

export interface Labelable {
  label: string;
}

export interface Timestampable {
  timestamp: number;
}

export interface SaveOptions {
  deleteForever?: boolean;
  undoDelete?: boolean;
}

export namespace Category {
  /**
   * These are just constants which are associated with each category type and
   * used consitently with the category throughout the system.
   *
   * REVIEW perhaps it would be nice of there was a more consistent pattern
   *        for these things (ie, consolidate truck/haul equipment,
   *        load/loader/loadEquip)
   */
  const categories = new Map<CategoryType, Category>([
    [
      CategoryType.SITE,
      <Category>{
        type: CategoryType.SITE,
        i18n: 'production_site',
        unknownI18n: 'production_unknown_site',
        icon: 'texture',
        iconClass: 'material-icons',
        summariesKey: 'undefined',
      },
    ],
    [
      CategoryType.SITE_LOAD,
      <Category>{
        type: CategoryType.SITE,
        i18n: 'production_site_loads',
        unknownI18n: 'production_unknown_site',
        icon: 'texture',
        iconClass: 'material-icons',
        summariesKey: 'undefined',
      },
    ],
    [
      CategoryType.SITE_DUMP,
      <Category>{
        type: CategoryType.SITE,
        i18n: 'production_site_dumps',
        unknownI18n: 'production_unknown_site',
        icon: 'texture',
        iconClass: 'material-icons',
        summariesKey: 'undefined',
      },
    ],
    [
      CategoryType.LOAD_AREA,
      <Category>{
        type: CategoryType.LOAD_AREA,
        i18n: 'production_loadArea',
        unknownI18n: 'production_unknown_loadArea',
        icon: 'load_area',
        iconClass: 'icons',
        summariesKey: 'loadAreaSummaries',
      },
    ],
    [
      CategoryType.LOAD_EQUIPMENT,
      <Category>{
        type: CategoryType.LOAD_EQUIPMENT,
        i18n: 'equipment_loadEquip',
        unknownI18n: 'production_unknown_loadEquip',
        icon: 'load',
        iconClass: 'icons',
        summariesKey: 'loadEquipSummaries',
      },
    ],
    [
      CategoryType.MATERIAL,
      <Category>{
        type: CategoryType.MATERIAL,
        i18n: 'production_material',
        unknownI18n: 'production_unknown_material',
        icon: 'texture',
        iconClass: 'material-icons',
        summariesKey: 'materialSummaries',
      },
    ],
    [
      CategoryType.HAUL_EQUIPMENT,
      <Category>{
        type: CategoryType.HAUL_EQUIPMENT,
        i18n: 'equipment_haulEquip',
        unknownI18n: 'production_unknown_haulEquip',
        icon: 'haul_truck',
        iconClass: 'icons',
        summariesKey: 'haulEquipSummaries',
      },
    ],
    [
      CategoryType.DUMP_AREA,
      <Category>{
        type: CategoryType.DUMP_AREA,
        i18n: 'production_dumpArea',
        unknownI18n: 'production_unknown_dumpArea',
        icon: 'dump',
        iconClass: 'icons',
        summariesKey: 'dumpSummaries',
      },
    ],
    [
      CategoryType.CRUSHER_AREA,
      <Category>{
        type: CategoryType.CRUSHER_AREA,
        i18n: 'production_crusher',
        unknownI18n: 'production_unknown_crusherArea',
        icon: 'crusher',
        iconClass: 'icons',
        summariesKey: 'crusherSummaries',
      },
    ],
    [
      CategoryType.ROUTE,
      <Category>{
        type: CategoryType.ROUTE,
        i18n: 'production_route',
        unknownI18n: 'production_unknown_route',
        icon: 'route',
        iconClass: 'icons',
        summariesKey: 'routeSummaries',
      },
    ],
  ] as Array<[CategoryType, Category]>);

  /**
   * Gets the category type (constant) by the category type.
   *
   * @param categoryType the category type to which we are attempting to
   *                     resolve the category details from
   */
  export function findByCategoryType(categoryType: CategoryType): Category {
    return categories.get(categoryType)!;
  }

  /**
   * Return an array of all I18N keys for all category types
   */
  export function i18nKeys(): string[] {
    let keys: string[] = [];
    categories.forEach((v: Category) => {
      keys.push(v.i18n);
      keys.push(v.unknownI18n);
    });

    return keys;
  }
}

export const enum EquipmentOperationalStatus {
  UP = 'UP',
  SCHEDULED_MAINTENANCE = 'SCHEDULED_MAINTENANCE',
  UNSCHEDULED_MAINTENANCE = 'UNSCHEDULED_MAINTENANCE',
}

export const enum PlanAreaProductionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export const enum SiteSubscription {
  EQUIPMENT_TRACKING = 'EquipmentTracking',
  PRODUCTION_RECORDING = 'ProductionRecording',
  SURFACE_AND_MATERIAL_MANAGEMENT = 'SurfaceMaterialManagement',
  OPTIMIZATION = 'Optimization',
}
