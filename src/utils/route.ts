/**
 * Base on https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/utils/route-utils.ts
 * Edited because e do not currently convert the Ids to their identity (src/common/providers/haul-cycle/haul-cycle.service.ts:joinRelation)
 */

import {Route} from '../api/types/cat/route';
import {CatHaulCycle} from '../api/types/haul-cycle';
import {HaulCycle} from '../api/types/cat/haul-cycle';
import {HaulCycleUtils} from './haul-cycle';
import {CommonConstants} from '../api/types/cat/common';

export class RouteUtils {
  public static generateIdFromCatHaulCycle(haulCycle: CatHaulCycle) {
    return [
      haulCycle.sourceArea,
      haulCycle.loadEquipment,
      haulCycle.destinationArea,
    ]
      .map(entity =>
        entity && entity !== CommonConstants.UNDEFINED_UUID ? entity : '',
      )
      .join(',');
  }

  /**
   * Creates an id which is used to resolve production targets for CatHaulCycle.
   *
   * @param route the route or haul cycle data object to extract the id from
   */
  public static generateIdFrom(route: Route | HaulCycle) {
    return [route.sourceArea, route.loadEquipment, route.destinationArea]
      .map(entity =>
        HaulCycleUtils.isEntityUndefined(entity) ? '' : entity?.id,
      )
      .join(',');
  }

  /**
   * A null safe comparison function for routes against the underlying uids for each route component.
   *
   * @param route the route to test
   * @param other the sourceArea/loadEquipment/destinationArea object to validate against
   */
  public static isOnRoute(route: Route, other: CatHaulCycle) {
    return (
      RouteUtils.generateIdFrom(route) ===
      RouteUtils.generateIdFromCatHaulCycle(other)
    );
  }
}
