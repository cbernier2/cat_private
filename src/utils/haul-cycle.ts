/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/utils/haul-cycle-utils.ts
 * Edited for lint/prettier fixes and imports
 */

import {CategoryType, CommonConstants} from '../api/types/cat/common';
import {HaulCycle} from '../api/types/cat/haul-cycle';
import {flatten} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {MaterialUtils} from '../api/types/cat/material';
import {TimeData} from '../components/graphs/types';
import {Style} from '../api/types/cat/colors';

export class HaulCycleUtils {
  // This is a shim which can hopefully can be removed when we can confirm that legacy use cases
  // of having haul cycle entities represented as nulls, {} or {id: CommonConstants.UNDEFINED_UUID}
  // has been unified (and appropraite types updated to reflect that)
  public static isEntityUndefined(entity?: any): boolean {
    return !(
      entity &&
      entity.id &&
      entity.id !== CommonConstants.UNDEFINED_UUID
    );
  }

  // Checks if a cycle is classed as undefined
  public static isCycleUndefined(haulCycle: HaulCycle): boolean {
    return (
      (haulCycle.material.id === CommonConstants.UNDEFINED_UUID ||
        haulCycle.haulEquipment.id === CommonConstants.UNDEFINED_UUID ||
        (haulCycle.loadEquipment.id === CommonConstants.UNDEFINED_UUID &&
          !haulCycle.sourceArea.isFaceSuppressingUndefinedLoaderExceptions) ||
        haulCycle.sourceArea.id === CommonConstants.UNDEFINED_UUID ||
        haulCycle.destinationArea.id === CommonConstants.UNDEFINED_UUID) &&
      !haulCycle.flagged
    );
  }

  /**
   * Returns a function which can be used for filtering undefined haulcycles
   * from an array (or anything that takes a filter function)
   *
   * @param categoryType the category type to to build the filter from
   * @param suppressUndefinedLoaderExceptions
   * @deprecated This no longer an accurate depection of what is and is not an undefined
   *             category type as the haul cycles are not representative for all categories
   *             (specifically load areas and loaders) It is recommended to use data from the
   *             appropriate production summary where the id is that of the undefined entity.
   */
  public static undefinedCategoryTypeFilter(
    categoryType: CategoryType,
    suppressUndefinedLoaderExceptions: boolean = false,
  ): (x: any) => boolean {
    return (haulCycle: HaulCycle) => {
      switch (categoryType) {
        case CategoryType.CRUSHER_AREA:
        case CategoryType.DUMP_AREA:
          return HaulCycleUtils.isEntityUndefined(haulCycle.destinationArea);
        case CategoryType.HAUL_EQUIPMENT:
          return HaulCycleUtils.isEntityUndefined(haulCycle.haulEquipment);
        case CategoryType.LOAD_AREA:
          return HaulCycleUtils.isEntityUndefined(haulCycle.sourceArea);
        case CategoryType.LOAD_EQUIPMENT:
          return suppressUndefinedLoaderExceptions
            ? !haulCycle.sourceArea
                .isFaceSuppressingUndefinedLoaderExceptions &&
                HaulCycleUtils.isEntityUndefined(haulCycle.loadEquipment)
            : HaulCycleUtils.isEntityUndefined(haulCycle.loadEquipment);
        case CategoryType.MATERIAL:
          return HaulCycleUtils.isEntityUndefined(haulCycle.material);
      }
      return true;
    };
  }

  public static getUndefinedMaterialStyle(haulCycle: HaulCycle): Style | null {
    return (
      (haulCycle &&
        MaterialUtils.getUndefinedMaterialStyle(haulCycle.material)) ||
      null
    );
  }

  public static mapToTimeData(haulCycles: HaulCycle[]): TimeData[] {
    const endValue = {id: CommonConstants.NO_VALUE_ID};
    return flatten(
      haulCycles.map(haulCycle => [
        {
          time: haulCycle.loadStartTime,
          value: {id: uuidv4(), cssClassNames: 'truck-activity-loading'},
        },
        {time: haulCycle.loadCompletedTime, value: endValue},
        {
          time: haulCycle.dumpStartTime,
          value: {
            id: uuidv4(),
            cssClassNames: 'truck-activity-dumping cursor-pointer',
            emitData: true,
          },
        },
        {time: haulCycle.dumpCompletedTime, value: endValue},
      ]),
    ).sort((r1, r2) => r1.time - r2.time);
  }
}
