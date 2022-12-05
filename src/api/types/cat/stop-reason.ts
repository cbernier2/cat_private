/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/stop-reason-type/stop-reason-type-d-o.ts
 * Edited for lint/prettier fixes and imports
 */

import {EquipmentType} from 'minestar-equipment-defs/definitions';
import {v4 as uuidv4} from 'uuid';
import {
  CommonConstants,
  EquipmentOperationalStatus,
  UNDEFINED_VALUE,
} from './common';
import {ObjectUtils} from '../../../utils/object-utils';

export interface StopReasonTypeDecorated {
  stopReasonTypeDO: StopReasonTypeDO;
  translatedName?: string;
}

export interface StopReasonTypeDO {
  id: string;
  name: string;
  colloquialName: string;
  startTime: number;
  endTime: number;
  deleted: boolean;
  classification: StopReasonClassification;
  siteWide: boolean;
  equipmentTypes: EquipmentType[];
  systemDefined: boolean;
  iconName: string;
  externalReference?: string;
  expectedDuration?: number;
  lastUpdated?: number;
}

export const enum StopReasonClassification {
  OPERATIONAL_DELAY = 'OPERATIONAL_DELAY',
  SCHEDULED_MAINTENANCE = 'SCHEDULED_MAINTENANCE',
  UNSCHEDULED_MAINTENANCE = 'UNSCHEDULED_MAINTENANCE',
  STANDBY = 'STANDBY',
}

export interface StopReasonCategory {
  expanded: boolean;
  classifications: StopReasonClassification[];
  label: string;
  addUserDefined: boolean;
  iconClass: string;
}

export namespace StopReasonCategory {
  export function getStopReasonCategories(): StopReasonCategory[] {
    return [
      {
        expanded: true,
        classifications: [StopReasonClassification.OPERATIONAL_DELAY],
        label: 'operational_delay',
        addUserDefined: true,
        iconClass: 'circle-operational-delay',
      },
      {
        expanded: true,
        classifications: [StopReasonClassification.STANDBY],
        label: 'standby',
        addUserDefined: true,
        iconClass: 'circle-standby',
      },
      {
        expanded: true,
        classifications: [
          StopReasonClassification.UNSCHEDULED_MAINTENANCE,
          StopReasonClassification.SCHEDULED_MAINTENANCE,
        ],
        label: 'down_time',
        addUserDefined: false,
        iconClass: 'circle-down',
      },
    ];
  }
}

export namespace StopReasonTypeBuilder {
  export function build(): StopReasonTypeDO {
    return {
      id: uuidv4(),
      name: '',
      colloquialName: '',
      startTime: 0,
      endTime: 0,
      deleted: false,
      classification: StopReasonClassification.OPERATIONAL_DELAY,
      siteWide: false,
      equipmentTypes: [],
      systemDefined: false,
      iconName: '',
    };
  }
}

export namespace StopReasonTypeUtils {
  export function getResolvedStopReasonName(
    stopReasonType: StopReasonTypeDecorated,
  ): string {
    if (
      stopReasonType.stopReasonTypeDO.colloquialName ===
        stopReasonType.stopReasonTypeDO.name ||
      ObjectUtils.isNotValid(stopReasonType.stopReasonTypeDO.colloquialName) ||
      stopReasonType.stopReasonTypeDO.colloquialName.trim().length === 0
    ) {
      if (
        stopReasonType.translatedName !== undefined &&
        stopReasonType.translatedName.length > 0
      ) {
        return stopReasonType.translatedName;
      } else {
        return stopReasonType.stopReasonTypeDO.name;
      }
    } else {
      return stopReasonType.stopReasonTypeDO.colloquialName.trim();
    }
  }

  export function mapToOption(stopReasonType: StopReasonTypeDecorated) {
    return !stopReasonType
      ? null
      : {
          id: stopReasonType.stopReasonTypeDO.id,
          name: StopReasonTypeUtils.getResolvedStopReasonName(stopReasonType),
          checked: false,
          value: stopReasonType.stopReasonTypeDO.id,
        };
  }
  export function mapToValue(stopReasonType?: StopReasonTypeDecorated): any {
    let color: string = CommonConstants.UNKNOWN_VALUE_COLOUR;
    if (stopReasonType) {
      color = StopReasonTypeUtils.mapToColor(stopReasonType.stopReasonTypeDO);
    }
    let name: string =
      stopReasonType !== undefined
        ? StopReasonTypeUtils.getResolvedStopReasonName(stopReasonType)
        : UNDEFINED_VALUE;
    let id: string = stopReasonType
      ? stopReasonType.stopReasonTypeDO.id
      : uuidv4();
    return {id: id, name: name, color: color};
  }

  export function mapToColor(stopReasonType: StopReasonTypeDO) {
    switch (stopReasonType.classification) {
      case StopReasonClassification.OPERATIONAL_DELAY:
        return CommonConstants.COLOR_DARK_ORANGE;
      case StopReasonClassification.STANDBY:
        return CommonConstants.COLOR_DARK_BLUE;
      case StopReasonClassification.UNSCHEDULED_MAINTENANCE:
      case StopReasonClassification.SCHEDULED_MAINTENANCE:
        return CommonConstants.COLOR_DARK_RED;
    }
  }

  export function mapToIconClass(stopReasonType?: StopReasonTypeDO): string {
    if (stopReasonType) {
      switch (stopReasonType.classification) {
        case StopReasonClassification.STANDBY:
          return 'standby-icon';
        case StopReasonClassification.OPERATIONAL_DELAY:
          return 'operational-delay-icon';
        case StopReasonClassification.UNSCHEDULED_MAINTENANCE:
        case StopReasonClassification.SCHEDULED_MAINTENANCE:
          return 'down-icon';
      }
    } else {
      return 'operational-delay-icon';
    }
  }

  export function mapToEquipmentOperationalStatus(
    stopReasonType: StopReasonTypeDO,
  ): EquipmentOperationalStatus {
    if (
      stopReasonType.classification ===
      StopReasonClassification.SCHEDULED_MAINTENANCE
    ) {
      return EquipmentOperationalStatus.SCHEDULED_MAINTENANCE;
    } else if (
      stopReasonType.classification ===
      StopReasonClassification.UNSCHEDULED_MAINTENANCE
    ) {
      return EquipmentOperationalStatus.UNSCHEDULED_MAINTENANCE;
    }
    return EquipmentOperationalStatus.UP;
  }

  export function isMaintenanceType(stopReasonType: StopReasonTypeDO): boolean {
    return (
      stopReasonType.classification ===
        StopReasonClassification.SCHEDULED_MAINTENANCE ||
      stopReasonType.classification ===
        StopReasonClassification.UNSCHEDULED_MAINTENANCE
    );
  }

  export function isFueling(stopReasonType: StopReasonTypeDO): boolean {
    return (
      stopReasonType &&
      stopReasonType.classification ===
        StopReasonClassification.OPERATIONAL_DELAY &&
      stopReasonType.name === 'Fueling'
    );
  }

  export function isCompatibleType(
    stopReasonType1: StopReasonTypeDO,
    stopReasonType2: StopReasonTypeDO,
  ): boolean {
    return (
      (isMaintenanceType(stopReasonType1) &&
        isMaintenanceType(stopReasonType2)) ||
      (!isMaintenanceType(stopReasonType1) &&
        !isMaintenanceType(stopReasonType2))
    );
  }

  export function decorateTranslation(
    stopReasonDO: StopReasonTypeDO,
    translations: any,
  ): StopReasonTypeDecorated | null {
    if (ObjectUtils.isNotValid(stopReasonDO)) {
      return null;
    }
    let decoratedStopReason: StopReasonTypeDecorated = {
      stopReasonTypeDO: stopReasonDO,
    };
    let nameAsKey = stopReasonDO.name.toLowerCase().replace(' ', '_');
    let translationFound = translations[nameAsKey] !== nameAsKey;
    if (translationFound && ObjectUtils.isValid(translations[nameAsKey])) {
      decoratedStopReason.translatedName = translations[nameAsKey];
    }
    return decoratedStopReason;
  }
}
