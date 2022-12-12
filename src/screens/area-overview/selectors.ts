import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux';
import {CommonConstants} from '../../api/types/cat/common';
import {CatAreaSummary} from '../../redux/site/helpers/transformSummaries';
import {CatHaulCycle} from '../../api/types/haul-cycle';
import {findMaterial} from '../../api/material';

export const areaHaulCyclesSelector = createSelector(
  (state: RootState, areaSummary: CatAreaSummary | null) => areaSummary,
  (state: RootState) => state.site.haulCycles,
  (areaSummary, haulCycles): CatHaulCycle[] => {
    if (!areaSummary) {
      return [];
    }
    const areaId = areaSummary.area?.id ?? CommonConstants.UNDEFINED_UUID;
    return haulCycles.filter(
      haulCycle =>
        haulCycle.sourceArea === areaId || haulCycle.destinationArea === areaId,
    );
  },
);

export const areaMaterialSelector = createSelector(
  (state: RootState, areaSummary: CatAreaSummary | null) => areaSummary,
  (state: RootState) => state.site.materials,
  (areaSummary, materials) => {
    return findMaterial(materials, areaSummary?.lastObservedMaterialId);
  },
);
