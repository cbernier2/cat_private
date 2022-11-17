import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {
  currentRouteHaulCycles,
  currentRouteSelector,
} from '../../redux/site/site-selectors';
import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';
import {MinestarIconName} from '../../components/minestar-icon/types';

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
      area => area.id === currentRoute.sourceArea?.id,
    );
    const dumpAreaSummary = dumpAreaSummaries?.find(
      area => area.id === currentRoute.destinationArea?.id,
    );
    if (loadAreaSummary) {
      routeAreas.push({
        name: loadAreaSummary.loadArea.name,
        summary: loadAreaSummary,
        icon: 'load_area',
      });
    }
    if (dumpAreaSummary) {
      routeAreas.push({
        name: dumpAreaSummary.dumpArea.name,
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
    return [
      ...(
        loadEquipSummaries?.filter(loadEquipSummary =>
          loadEquipmentsIds.has(loadEquipSummary.equipment.id),
        ) ?? []
      )
        .sort((a, b) => a.equipment!.name.localeCompare(b.equipment.name))
        .map(loadEquipSummary => ({
          ...loadEquipSummary,
          isLoad: true,
        })),
      ...(
        haulEquipSummaries?.filter(haulEquipSummary =>
          haulEquipmentsIds.has(haulEquipSummary.equipment.id),
        ) ?? []
      )
        .sort((a, b) => a.equipment.name.localeCompare(b.equipment.name))
        .map(haulEquipSummary => ({
          ...haulEquipSummary,
          isLoad: false,
        })),
    ];
  },
);
