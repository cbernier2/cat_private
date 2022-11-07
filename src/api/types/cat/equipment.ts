// Copy from Caterpillar Web App: src/common/providers/equipment/equipment.ts

import {Shift} from './shift';
import {CategoryType, EquipmentOperationalStatus} from './common';
import {EquipmentType as UnifiedEquipmentType} from 'minestar-equipment-defs';

declare var moment: any;

/**
 * Although these are explicitly 'Vehicle types' vehicles are a classified
 * as equipment following the class hierachy on the server.
 */
export enum EquipmentType {
  DRAGLINE = 'Dragline',
  DRILL = 'Drill',
  AUXILIARY = 'Auxiliary',
  // support
  COMPACTOR = 'Compactor',
  DOZER = 'Dozer',
  FUEL_TRUCK = 'FuelTruck',
  GRADER = 'Grader',
  LIGHT_VEHICLE = 'LightVehicle',
  SCRAPER = 'Scraper',
  SOIL_COMPACTOR = 'SoilCompactor',
  WHEEL_DOZER = 'WheelDozer',
  WATER_TRUCK = 'WaterTruck',
  // haulers
  TRUCK = 'Truck',
  ARTICULATED_TRUCK = 'ArticulatedTruck',
  // loaders
  HYDRAULIC_EXCAVATOR = 'HydraulicExcavator',
  HYDRAULIC_MINING_SHOVEL = 'HydraulicMiningShovel',
  ROPE_SHOVEL = 'RopeShovel',
  WHEEL_LOADER = 'WheelLoader',
}

export class SmuSource {
  public static readonly RAW_REPORTED_VALUE: string = 'RAW_REPORTED_VALUE';
  public static readonly TIMELINE_VALUE_REPORTED: string =
    'TIMELINE_VALUE_REPORTED';
  public static readonly TIMELINE_VALUE_CALCULATED: string =
    'TIMELINE_VALUE_CALCULATED';
  public static readonly OBSERVATION: string = 'OBSERVATION';
}

/**
 * EquipmentType enumeration specific functions
 */
export namespace EquipmentTypeUtils {
  export function isHauler(type: EquipmentType) {
    return (
      type === EquipmentType.TRUCK || type === EquipmentType.ARTICULATED_TRUCK
    );
  }

  export function isLoader(type: EquipmentType) {
    return (
      type === EquipmentType.HYDRAULIC_EXCAVATOR ||
      type === EquipmentType.HYDRAULIC_MINING_SHOVEL ||
      type === EquipmentType.ROPE_SHOVEL ||
      type === EquipmentType.WHEEL_LOADER
    );
  }

  export function isSupport(type: EquipmentType) {
    return (
      type === EquipmentType.COMPACTOR ||
      type === EquipmentType.DOZER ||
      type === EquipmentType.FUEL_TRUCK ||
      type === EquipmentType.GRADER ||
      type === EquipmentType.LIGHT_VEHICLE ||
      type === EquipmentType.SCRAPER ||
      type === EquipmentType.SOIL_COMPACTOR ||
      type === EquipmentType.WHEEL_DOZER ||
      type === EquipmentType.WATER_TRUCK
    );
  }

  /**
   * Converts an equipment type to a category type.
   * @param equipmentType the equipment type to be converted
   */
  export function toCategoryType(type: EquipmentType): CategoryType | null {
    if (isHauler(type)) {
      return CategoryType.HAUL_EQUIPMENT;
    } else if (isLoader(type)) {
      return CategoryType.LOAD_EQUIPMENT;
    } else if (isSupport(type)) {
      return CategoryType.SUPPORT_EQUIPMENT;
    }
    return null;
  }

  /**
   * Converts the Edge Types to the unified Equipment Type provided by minestar-equipment-defs
   *
   * @param type the internal Edge Equipment Type
   */
  export function toUnifiedEquipmentType(
    type: EquipmentType,
  ): UnifiedEquipmentType | null {
    switch (type) {
      case EquipmentType.DOZER:
        return UnifiedEquipmentType.TRACK_DOZER;
      case EquipmentType.WHEEL_DOZER:
        return UnifiedEquipmentType.WHEEL_DOZER;
      case EquipmentType.WHEEL_LOADER:
        return UnifiedEquipmentType.WHEEL_LOADER;
      case EquipmentType.ROPE_SHOVEL:
        return UnifiedEquipmentType.CABLE_SHOVEL;
      case EquipmentType.COMPACTOR:
        return UnifiedEquipmentType.COMPACTOR;
      case EquipmentType.GRADER:
        return UnifiedEquipmentType.GRADER;
      case EquipmentType.SCRAPER:
        return UnifiedEquipmentType.SCRAPER;
      case EquipmentType.SOIL_COMPACTOR:
        return UnifiedEquipmentType.SOIL_COMPACTOR;
      case EquipmentType.DRILL:
        return UnifiedEquipmentType.DRILL;
      case EquipmentType.TRUCK:
        return UnifiedEquipmentType.HAUL_TRUCK;
      case EquipmentType.WATER_TRUCK:
        return UnifiedEquipmentType.WATER_TRUCK;
      case EquipmentType.HYDRAULIC_EXCAVATOR:
        return UnifiedEquipmentType.TRACK_EXCAVATOR;
      case EquipmentType.HYDRAULIC_MINING_SHOVEL:
        return UnifiedEquipmentType.HYDRAULIC_SHOVEL;
      case EquipmentType.ARTICULATED_TRUCK:
        return UnifiedEquipmentType.ARTICULATED_TRUCK;
      case EquipmentType.DRAGLINE:
        return UnifiedEquipmentType.DRAGLINE;
      case EquipmentType.FUEL_TRUCK:
        return UnifiedEquipmentType.FUEL_TRUCK;
      case EquipmentType.LIGHT_VEHICLE:
        return UnifiedEquipmentType.LIGHT_VEHICLE;
      default:
        return null;
    }
  }

  export function getAllSupportedUnifiedTypes(): UnifiedEquipmentType[] {
    let returnValue: Set<UnifiedEquipmentType> = new Set();
    for (let localType in EquipmentType) {
      if (EquipmentType.hasOwnProperty(localType)) {
        let unifiedType = toUnifiedEquipmentType(
          (<any>EquipmentType)[localType],
        );
        if (unifiedType) {
          returnValue.add(unifiedType);
        }
      }
    }
    return Array.from(returnValue);
  }

  export function getDisplayLabelKey(
    equipmentType: UnifiedEquipmentType,
  ): string | null {
    switch (equipmentType) {
      case UnifiedEquipmentType.TRACK_DOZER:
        return 'equipmentTypeDozer';
      case UnifiedEquipmentType.WHEEL_LOADER:
        return 'equipmentTypeWheelLoader';
      case UnifiedEquipmentType.CABLE_SHOVEL:
        return 'equipmentTypeRopeShovel';
      case UnifiedEquipmentType.COMPACTOR:
        return 'equipmentTypeCompactor';
      case UnifiedEquipmentType.GRADER:
        return 'equipmentTypeGrader';
      case UnifiedEquipmentType.SCRAPER:
        return 'equipmentTypeScraper';
      case UnifiedEquipmentType.SOIL_COMPACTOR:
        return 'equipmentTypeSoilCompactor';
      case UnifiedEquipmentType.WHEEL_DOZER:
        return 'equipmentTypeWheelDozer';
      case UnifiedEquipmentType.DRILL:
        return 'equipmentTypeDrill';
      case UnifiedEquipmentType.OTHER_WITH_HEADING:
        return 'equipmentTypeOtherWithHeading';
      case UnifiedEquipmentType.HAUL_TRUCK:
        return 'equipmentTypeTruck';
      case UnifiedEquipmentType.WATER_TRUCK:
        return 'equipmentTypeWaterTruck';
      case UnifiedEquipmentType.TRACK_EXCAVATOR:
        return 'equipmentTypeHydraulicExcavator';
      case UnifiedEquipmentType.HYDRAULIC_SHOVEL:
        return 'equipmentTypeHydraulicMiningShovel';
      case UnifiedEquipmentType.ARTICULATED_TRUCK:
        return 'equipmentTypeArticulatedTruck';
      case UnifiedEquipmentType.DRAGLINE:
        return 'equipmentTypeDragline';
      case UnifiedEquipmentType.FUEL_TRUCK:
        return 'equipmentTypeFuelTruck';
      case UnifiedEquipmentType.TRACTOR:
        return 'equipmentTypeTractor';
      case UnifiedEquipmentType.WHEEL_EXCAVATOR:
        return 'equipmentTypeWheelExcavator';
      case UnifiedEquipmentType.TRACK_LOADER:
        return 'equipmentTypeTrackLoader';
      case UnifiedEquipmentType.LIGHT_VEHICLE:
        return 'equipmentTypeLightVehicle';
      case UnifiedEquipmentType.INFRASTRUCTURE:
        return 'equipmentTypeInfrastructure';
      case UnifiedEquipmentType.SURFACE_MINER:
        return 'equipmentTypeSurfaceMiner';
      case UnifiedEquipmentType.UNDERGROUND_TRUCK:
        return 'equipmentTypeUndergroundTruck';
      case UnifiedEquipmentType.UNDERGROUND_LHD:
        return 'equipmentTypeUndergroundLhd';
      case UnifiedEquipmentType.TERRAIN_LEVELER:
        return 'equipmentTypeTerrainLeveler';
      case UnifiedEquipmentType.PERCEPTION_BASED_LOCALIZATION:
        return 'equipmentTypePerceptionBasedLocalization';
      case UnifiedEquipmentType.PERCEPTION_CALIBRATION_VERIFICATION:
        return 'equipmentTypePerceptionCalibrationVerification';
      case UnifiedEquipmentType.AUTOMATIC_OBJECT_DETECTION_VERIFICATION:
        return 'equipmentTypeAutomaticObjectDetectionVerification';
      case UnifiedEquipmentType.UNDERGROUND_SBU:
        return 'equipmentTypeUndergroundSbu';
      case UnifiedEquipmentType.OTHER_NO_HEADING:
        return 'equipmentTypeOtherNoHeading';
      default:
        return null;
    }
  }
}

/**
 * Subscription types for equipment
 */
export enum EquipmentSubscription {
  BASE_EQUIPMENT_TRACKING = 'BASE_EQUIPMENT_TRACKING',
  PRODUCTION_RECORDING = 'PRODUCTION_RECORDING',

  /** @todo - confirm enumeration value for LASC subscriptions! */
  LASC = 'LASC',
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  timestamp: number;
  length: number;
  subscriptions: EquipmentSubscription[];
  configurationReceived: boolean;
  instrumented: boolean;
}

/**
 * Declaration merging over Equipment enumeration to provided some
 * enum specific functions
 */
export namespace Equipment {
  export function supportsProductionRecording(equipment: Equipment) {
    if (equipment && equipment.subscriptions) {
      return equipment.subscriptions.includes(
        EquipmentSubscription.PRODUCTION_RECORDING,
      );
    }
    return false;
  }

  export function supportsBaseTracking(equipment: Equipment) {
    if (equipment && equipment.subscriptions) {
      return equipment.subscriptions.includes(
        EquipmentSubscription.BASE_EQUIPMENT_TRACKING,
      );
    }
    return false;
  }

  /**
   * LASC: Lightweight Autonomy Supervisory Control
   */
  export function supportsLASC(equipment: Equipment) {
    if (equipment && equipment.subscriptions) {
      return equipment.subscriptions.includes(EquipmentSubscription.LASC);
    }
    return false;
  }
}

export interface EquipmentDetailed {
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  deleted: boolean;
  type: EquipmentType;
  make: string;
  model: string;
  isMeasured: boolean;
  height: number;
  width: number;
  length: number;
  isHauler: boolean;
  nominalPayload: number;
  heapedBedVolume: number;
  ignoreScaleWeight: boolean;
  usesFuel: boolean;
  fuelCapacity: number;
  isLoader: boolean;
  heapedBucketVolume: number;
  serialNumber?: string;
  receiverLocation?: EquipmentReceiverLocation;
  hasAntenna?: boolean;
  instrumented: boolean;
  waterTankCapacity: number;
  maxSprayWidth: number;
}

export enum KeyState {
  UNKNOWN = 'Unknown',
  OFF = 'Off',
  ON = 'On',
}

export interface WaterTruckStatus {
  watering: boolean;
  timestamp: number;
}

export interface VehiclePosition {
  equipment: Equipment & {
    state: EquipmentOperationalStatus;
    stateColor: string;
  };
  timestamp: number;
  x: number;
  y: number;
  z: number;
  heading?: number;
  speed?: number;
  keyState?: KeyState;
  keyStateTimestamp?: number;
  fuelLevel?: number;
  stopReasonTypeId: string;
  waterTruckStatus?: WaterTruckStatus;
}

export interface EquipmentState {
  shift: Shift;
  latestVehiclePositions: VehiclePosition[];
}

export interface EquipmentReceiverLocation {
  centerToReceiver: number;
  rearAxleToReceiver: number;
  groundToReceiver: number;
}

// An indicator level identifying how long ago a message was received by a piece
// of equipment (used by the icon rendering logic)
export enum EquipmentIndicator {
  NONE = 'no',
  GREEN = 'green',
  ORANGE = 'orange',
  RED = 'red',
}

export class EquipmentIndicatorUtil {
  /**
   * Gets an 'indicator value' based on the rules defined in the equipment icon
   * state document.
   *
   * @param timestamp the timestamp to check (usually vehicle position)
   * @param shift (optional) the shift to which the timestamp should be
   *              compared against
   */
  public static getForTimestampAndShift(
    timestamp: number,
    shift?: Shift,
  ): EquipmentIndicator {
    if (!shift) {
      return EquipmentIndicator.NONE;
    }
    const ts = moment(timestamp);
    const now = moment();
    if (ts.isAfter(now.subtract(1, 'hour'))) {
      return EquipmentIndicator.GREEN;
    } else if (ts.isAfter(moment(shift.startTime))) {
      return EquipmentIndicator.ORANGE;
    }
    return EquipmentIndicator.RED;
  }
}

export class EquipmentIconUtils {
  public static getIcon(equipmentType: EquipmentType): string | null {
    switch (equipmentType) {
      case EquipmentType.DRAGLINE:
        return 'dragline';
      case EquipmentType.DRILL:
        return 'drill';
      case EquipmentType.AUXILIARY:
        return 'auxiliary';
      case EquipmentType.DOZER:
        return 'dozer';
      case EquipmentType.FUEL_TRUCK:
        return 'fuel_truck';
      case EquipmentType.GRADER:
        return 'grader';
      case EquipmentType.LIGHT_VEHICLE:
        return 'light_vehicle';
      case EquipmentType.SCRAPER:
        return 'scraper';
      case EquipmentType.SOIL_COMPACTOR:
        return 'soil_compactor';
      case EquipmentType.WHEEL_DOZER:
        return 'wheel_dozer';
      case EquipmentType.HYDRAULIC_EXCAVATOR:
      case EquipmentType.HYDRAULIC_MINING_SHOVEL:
        return 'load';
      case EquipmentType.ROPE_SHOVEL:
        return 'rope_shovel';
      case EquipmentType.WHEEL_LOADER:
        return 'wheel_loader';
      case EquipmentType.ARTICULATED_TRUCK:
        return 'articulated_truck';
      case EquipmentType.COMPACTOR:
        return 'compactor';
      case EquipmentType.TRUCK:
        return 'haul_truck';
      case EquipmentType.WATER_TRUCK:
        return 'water_truck';
      default:
        return null;
    }
  }

  // TODO: add some more icons/map to existing icons(ask UI/UX person)
  public static getUnifiedEquipmentTypeIcon(
    equipmentType: UnifiedEquipmentType,
  ): string | null {
    switch (equipmentType) {
      case UnifiedEquipmentType.TRACK_DOZER:
        return 'dozer';
      case UnifiedEquipmentType.WHEEL_LOADER:
        return 'wheel_loader';
      case UnifiedEquipmentType.CABLE_SHOVEL:
        return 'rope_shovel';
      case UnifiedEquipmentType.COMPACTOR:
        return 'compactor';
      case UnifiedEquipmentType.GRADER:
        return 'grader';
      case UnifiedEquipmentType.SCRAPER:
        return 'scraper';
      case UnifiedEquipmentType.SOIL_COMPACTOR:
        return 'soil_compactor';
      case UnifiedEquipmentType.WHEEL_DOZER:
        return 'wheel_dozer';
      case UnifiedEquipmentType.DRILL:
        return 'drill';
      case UnifiedEquipmentType.OTHER_WITH_HEADING:
        return null;
      case UnifiedEquipmentType.HAUL_TRUCK:
        return 'haul_truck';
      case UnifiedEquipmentType.WATER_TRUCK:
        return 'water_truck';
      case UnifiedEquipmentType.TRACK_EXCAVATOR:
        return 'load';
      case UnifiedEquipmentType.HYDRAULIC_SHOVEL:
        return 'load';
      case UnifiedEquipmentType.ARTICULATED_TRUCK:
        return 'articulated_truck';
      case UnifiedEquipmentType.DRAGLINE:
        return 'dragline';
      case UnifiedEquipmentType.FUEL_TRUCK:
        return 'fuel_truck';
      case UnifiedEquipmentType.TRACTOR:
        return null;
      case UnifiedEquipmentType.WHEEL_EXCAVATOR:
        return null;
      case UnifiedEquipmentType.TRACK_LOADER:
        return null;
      case UnifiedEquipmentType.LIGHT_VEHICLE:
        return 'light_vehicle';
      case UnifiedEquipmentType.INFRASTRUCTURE:
        return null;
      case UnifiedEquipmentType.SURFACE_MINER:
        return null;
      case UnifiedEquipmentType.UNDERGROUND_TRUCK:
        return null;
      case UnifiedEquipmentType.UNDERGROUND_LHD:
        return null;
      case UnifiedEquipmentType.TERRAIN_LEVELER:
        return null;
      case UnifiedEquipmentType.PERCEPTION_BASED_LOCALIZATION:
        return null;
      case UnifiedEquipmentType.PERCEPTION_CALIBRATION_VERIFICATION:
        return null;
      case UnifiedEquipmentType.AUTOMATIC_OBJECT_DETECTION_VERIFICATION:
        return null;
      case UnifiedEquipmentType.UNDERGROUND_SBU:
        return null;
      case UnifiedEquipmentType.OTHER_NO_HEADING:
        return null;
      default:
        return null;
    }
  }
}

export class EquipmentLabelUtils {
  public static getLabel(equipmentType: EquipmentType): string | null {
    switch (equipmentType) {
      case EquipmentType.DRAGLINE:
        return 'equipmentTypeDragline';
      case EquipmentType.DRILL:
        return 'equipmentTypeDrill';
      case EquipmentType.AUXILIARY:
        return 'equipmentTypeAuxiliary';
      case EquipmentType.DOZER:
        return 'equipmentTypeDozer';
      case EquipmentType.FUEL_TRUCK:
        return 'equipmentTypeFuelTruck';
      case EquipmentType.GRADER:
        return 'equipmentTypeGrader';
      case EquipmentType.LIGHT_VEHICLE:
        return 'equipmentTypeLightVehicle';
      case EquipmentType.SCRAPER:
        return 'equipmentTypeScraper';
      case EquipmentType.SOIL_COMPACTOR:
        return 'equipmentTypeSoilCompactor';
      case EquipmentType.WHEEL_DOZER:
        return 'equipmentTypeWheelDozer';
      case EquipmentType.HYDRAULIC_EXCAVATOR:
        return 'equipmentTypeHydraulicExcavator';
      case EquipmentType.HYDRAULIC_MINING_SHOVEL:
        return 'equipmentTypeHydraulicMiningShovel';
      case EquipmentType.ROPE_SHOVEL:
        return 'equipmentTypeRopeShovel';
      case EquipmentType.WHEEL_LOADER:
        return 'equipmentTypeWheelLoader';
      case EquipmentType.ARTICULATED_TRUCK:
        return 'equipmentTypeArticulatedTruck';
      case EquipmentType.COMPACTOR:
        return 'equipmentTypeCompactor';
      case EquipmentType.TRUCK:
        return 'equipmentTypeTruck';
      case EquipmentType.WATER_TRUCK:
        return 'equipmentTypeWaterTruck';
      default:
        return null;
    }
  }
}
