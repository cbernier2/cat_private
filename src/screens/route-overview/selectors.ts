import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {
  currentShiftSelector,
  observationsSelector,
  RouteSelector,
  stopReasonTypesSelector,
} from '../../redux/site/site-selectors';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import {CatAreaSummary} from '../../redux/site/helpers/transformSummaries';
import {RouteUtils} from '../../utils/route';
import {getEquipmentStatusColor} from '../../api/equipment';
import {themeSelector} from '../../redux/app/app-selectors';

export const currentRouteHaulCycles = createSelector(
  (state: RootState, routeSelector: RouteSelector) => routeSelector(state),
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
  (state: RootState, routeSelector: RouteSelector) => routeSelector(state),
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

export const currentRouteEquipmentsSelector = createSelector(
  (state: RootState, routeSelector: RouteSelector) =>
    currentRouteHaulCycles(state, routeSelector),
  currentShiftSelector,
  (state: RootState) => state.site.productionSummary?.loadEquipSummaries,
  (state: RootState) => state.site.productionSummary?.haulEquipSummaries,
  observationsSelector,
  stopReasonTypesSelector,
  themeSelector,
  (
    haulCycles,
    currentShift,
    loadEquipSummaries,
    haulEquipSummaries,
    observations,
    stopReasonTypes,
    theme,
  ) => {
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
          type: categoryType,
          statusColor: getEquipmentStatusColor(
            summary,
            currentShift,
            observations,
            stopReasonTypes,
            theme,
          ),
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
