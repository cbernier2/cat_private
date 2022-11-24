import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {
  currentRouteHaulCycles,
  currentRouteSelector,
} from '../../redux/site/site-selectors';
import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';

export const currentRouteAreasSelector = createSelector(
  currentRouteSelector,
  (state: RootState) => state.site.productionSummary?.loadAreaSummaries,
  (state: RootState) => state.site.productionSummary?.dumpSummaries,
  (currentRouteSummary, loadAreaSummaries, dumpAreaSummaries) => {
    const routeAreas: {
      name: string;
      summary: CatSiteSummary;
      icon: MinestarIconName;
    }[] = [];
    const currentRoute = currentRouteSummary?.route;
    if (!currentRoute) {
      return routeAreas;
    }
    const loadAreaSummary = loadAreaSummaries?.find(
      area =>
        area.id ===
        (currentRoute.sourceArea?.id ?? CommonConstants.UNDEFINED_UUID),
    );
    const dumpAreaSummary = dumpAreaSummaries?.find(
      area =>
        area.id ===
        (currentRoute.destinationArea?.id ?? CommonConstants.UNDEFINED_UUID),
    );
    if (loadAreaSummary) {
      routeAreas.push({
        name: loadAreaSummary.area.name,
        summary: loadAreaSummary,
        icon: 'load_area',
      });
    }
    if (dumpAreaSummary) {
      routeAreas.push({
        name: dumpAreaSummary.area.name,
        summary: dumpAreaSummary,
        icon: 'dump',
      });
    }
    return routeAreas;
  },
);

export const currentRouteEquipmentsSelector = createSelector(
  currentRouteHaulCycles,
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries,
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries,
  (haulCycles, loadEquipSummaries, haulEquipSummaries) => {
    const loadEquipmentsIds = new Set();
    const haulEquipmentsIds = new Set();
    haulCycles.forEach(haulCycle => {
      loadEquipmentsIds.add(haulCycle.loadEquipment);
      haulEquipmentsIds.add(haulCycle.haulEquipment);
    });
    const getEquipSummaries = (
      ids: typeof loadEquipmentsIds,
      summaries: typeof loadEquipSummaries,
      categoryType: CategoryType,
    ) => {
      return (
        summaries?.filter(summary =>
          ids.has(summary.equipment?.id ?? CommonConstants.UNDEFINED_UUID),
        ) ?? []
      )
        .sort((a, b) =>
          (a.equipment?.name ?? '').localeCompare(b.equipment?.name ?? ''),
        )
        .map(summary => ({
          ...summary,
          categoryType,
        }));
    };
    return [
      ...getEquipSummaries(
        loadEquipmentsIds,
        loadEquipSummaries,
        CategoryType.LOAD_EQUIPMENT,
      ),
      ...getEquipSummaries(
        haulEquipmentsIds,
        haulEquipSummaries,
        CategoryType.HAUL_EQUIPMENT,
      ),
    ];
  },
);
