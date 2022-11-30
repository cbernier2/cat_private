import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {
  currentRouteHaulCycles,
  RouteSelector,
} from '../../redux/site/site-selectors';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {CategoryType, CommonConstants} from '../../api/types/cat/common';
import {CatAreaSummary} from '../../redux/site/helpers/transformSummaries';

export const currentRouteAreasSelector = (routeSelector: RouteSelector) =>
  createSelector(
    routeSelector,
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

export const currentRouteEquipmentsSelector = (routeSelector: RouteSelector) =>
  createSelector(
    currentRouteHaulCycles(routeSelector),
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
