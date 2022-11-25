import {createSelector} from '@reduxjs/toolkit';
import {
  currentEquipmentSelector,
  personsSelector,
} from '../../redux/site/site-selectors';
import {RootState} from '../../redux';
import {findMaterial} from '../../api/material';
import {findPersonById} from '../../api/person';
import {CategoryType} from '../../api/types/cat/common';

export const currentEquipmentPersonSelector = createSelector(
  currentEquipmentSelector,
  personsSelector,
  (equipmentSummary, persons) =>
    findPersonById(persons, equipmentSummary?.lastObservedOperatorId),
);

export const currentEquipmentAreaSelector = createSelector(
  currentEquipmentSelector,
  currentEquipmentSelector,
  (state: RootState) => state.site.productionSummary,
  (currentEquipment, equipmentSummary, summaries) => {
    if (currentEquipment?.categoryType === CategoryType.LOAD_EQUIPMENT) {
      return summaries?.loadAreaSummaries.find(
        loadAreaSummary =>
          loadAreaSummary.area.id === equipmentSummary?.lastObservedLoadAreaId,
      );
    } else {
      return summaries?.dumpSummaries.find(
        dumpSummary =>
          dumpSummary.area.id ===
          equipmentSummary?.lastObservedDestinationAreaId,
      );
    }
  },
);

export const currentEquipmentMaterialSelector = createSelector(
  currentEquipmentSelector,
  (state: RootState) => state.site.materials,
  (equipmentSummary, materials) => {
    return findMaterial(materials, equipmentSummary?.lastObservedMaterialId);
  },
);
