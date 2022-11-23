import {ProductionSummary} from '../../../api/types/cat/production';

import {transformSiteSummary} from './transformSiteSummary';
import {Material} from '../../../api/types/cat/material';
import {CategoryType, UnitType} from '../../../api/types/cat/common';
import {transformEquipSummary} from './transformEquipSummary';

export const transformSummaries = (
  summaries: ProductionSummary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
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
      route: routeSummary.route,
    })),
    loadAreaSummaries: summaries.loadAreaSummaries.map(loadAreaSummary => ({
      ...transformSiteSummary(loadAreaSummary, materials, defaultUnit),
      loadArea: loadAreaSummary.loadArea,
    })),
    dumpSummaries: summaries.dumpSummaries.map(dumpSummary => ({
      ...transformSiteSummary(dumpSummary, materials, defaultUnit),
      dumpArea: dumpSummary.dumpArea,
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

export type CatSummaries = ReturnType<typeof transformSummaries>;
