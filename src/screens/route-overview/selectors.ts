import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {CommonConstants} from '../../api/types/cat/common';
import {
  CatAreaSummary,
  CatRouteSummary,
} from '../../redux/site/helpers/transformSummaries';
import {RouteUtils} from '../../utils/route';

export const currentRouteHaulCycles = createSelector(
  (state: RootState, selectedRouteSummary: CatRouteSummary | undefined) =>
    selectedRouteSummary,
  (state: RootState) => state.site.haulCycles,
  (selectedRouteSummary, haulCycles) => {
    if (!selectedRouteSummary?.route) {
      return [];
    }
    return haulCycles.filter(haulCycle =>
      RouteUtils.isOnRoute(selectedRouteSummary.route, haulCycle),
    );
  },
);

export const currentRouteAreasSelector = createSelector(
  (state: RootState, selectedRouteSummary: CatRouteSummary | undefined) =>
    selectedRouteSummary,
  (state: RootState) => state.site.productionSummary?.loadAreaSummaries,
  (state: RootState) => state.site.productionSummary?.dumpSummaries,
  (selectedRouteSummary, loadAreaSummaries, dumpAreaSummaries) => {
    const routeAreas: {
      name: string;
      summary: CatAreaSummary;
      icon: MinestarIconName;
    }[] = [];
    const currentRoute = selectedRouteSummary?.route;
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
