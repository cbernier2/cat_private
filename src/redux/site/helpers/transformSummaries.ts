import {ProductionSummary} from '../../../api/types/cat/production';

import {Material} from '../../../api/types/cat/material';
import {
  AreaType,
  CategoryType,
  EquipmentType,
  UnitType,
} from '../../../api/types/cat/common';
import {PlanArea} from '../../../api/types/cat/plan-area';
import {Route} from '../../../api/types/cat/route';
import {Equipment} from '../../../api/types/cat/equipment';

import {transformEquipSummary} from './transformEquipSummary';
import {CatSiteSummary, transformSiteSummary} from './transformSiteSummary';

export type CatEquipmentSummary = CatSiteSummary & {
  equipment: Equipment | undefined;
  fuelLevelPercent: number;
  type: EquipmentType;
};

export type CatAreaSummary = CatSiteSummary & {
  area: PlanArea;
  type: AreaType;
};

export type CatRouteSummary = CatSiteSummary & {
  route: Route;
  type: CategoryType.ROUTE;
};

export interface CatSummaries {
  siteSummary: CatSiteSummary;
  siteLoadSummary: CatSiteSummary;
  routeSummaries: Array<CatRouteSummary>;
  loadAreaSummaries: Array<CatAreaSummary>;
  dumpSummaries: Array<CatAreaSummary>;
  loadEquipSummaries: Array<CatEquipmentSummary>;
  haulEquipSummaries: Array<CatEquipmentSummary>;
  supportEquipSummaries: Array<CatEquipmentSummary>;
  waterTruckSummaries: Array<CatEquipmentSummary>;
}

export const transformSummaries = (
  summaries: ProductionSummary,
  materials: Material[],
  defaultUnit: UnitType,
): CatSummaries | null => {
  if (!summaries) {
    return null;
  }

  return {
    siteSummary: transformSiteSummary(
      summaries.siteSummary,
      materials,
      defaultUnit,
    ),
    siteLoadSummary: transformSiteSummary(
      summaries.siteLoadSummary,
      materials,
      defaultUnit,
    ),
    routeSummaries: summaries.routeSummaries.map(routeSummary => ({
      ...transformSiteSummary(routeSummary, materials, defaultUnit),
      type: CategoryType.ROUTE,
      route: routeSummary.route,
    })),
    loadAreaSummaries: summaries.loadAreaSummaries.map(loadAreaSummary => ({
      ...transformSiteSummary(loadAreaSummary, materials, defaultUnit),
      type: CategoryType.LOAD_AREA,
      area: loadAreaSummary.loadArea,
    })),
    dumpSummaries: summaries.dumpSummaries.map(dumpSummary => ({
      ...transformSiteSummary(dumpSummary, materials, defaultUnit),
      type: CategoryType.DUMP_AREA,
      area: dumpSummary.dumpArea,
    })),
    loadEquipSummaries: summaries.loadEquipSummaries.map(equipSummary =>
      transformEquipSummary(
        CategoryType.LOAD_EQUIPMENT,
        equipSummary,
        equipSummary.loader,
        materials,
        defaultUnit,
      ),
    ),
    haulEquipSummaries: summaries.haulEquipSummaries.map(equipSummary =>
      transformEquipSummary(
        CategoryType.HAUL_EQUIPMENT,
        equipSummary,
        equipSummary.truck,
        materials,
        defaultUnit,
      ),
    ),
    supportEquipSummaries: summaries.supportEquipSummaries.map(equipSummary =>
      transformEquipSummary(
        CategoryType.SUPPORT_EQUIPMENT,
        equipSummary,
        equipSummary.equipment,
        materials,
        defaultUnit,
      ),
    ),
    waterTruckSummaries: summaries.waterTruckSummaries.map(equipSummary =>
      transformEquipSummary(
        CategoryType.WATER_TRUCK_EQUIPMENT,
        equipSummary,
        equipSummary.equipment,
        materials,
        defaultUnit,
      ),
    ),
  };
};
