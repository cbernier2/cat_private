import {ProductionSummary} from '../../../api/types/cat/production';

import {transformSiteSummary} from './transformSiteSummary';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';
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
    loadEquipSummaries: summaries.loadEquipSummaries
      .filter(equipSummary => equipSummary.loader !== undefined)
      .map(equipSummary =>
        transformEquipSummary(
          equipSummary,
          equipSummary.loader,
          materials,
          defaultUnit,
        ),
      ),
    haulEquipSummaries: summaries.haulEquipSummaries
      .filter(equipSummary => equipSummary.truck !== undefined)
      .map(equipSummary =>
        transformEquipSummary(
          equipSummary,
          equipSummary.truck,
          materials,
          defaultUnit,
        ),
      ),
    supportEquipSummaries: summaries.supportEquipSummaries
      .filter(equipSummary => equipSummary.equipment !== undefined)
      .map(equipSummary =>
        transformEquipSummary(
          equipSummary,
          equipSummary.equipment,
          materials,
          defaultUnit,
        ),
      ),
    waterTruckSummaries: summaries.waterTruckSummaries
      .filter(equipSummary => equipSummary.equipment !== undefined)
      .map(equipSummary =>
        transformEquipSummary(
          equipSummary,
          equipSummary.equipment,
          materials,
          defaultUnit,
        ),
      ),
  };
};
