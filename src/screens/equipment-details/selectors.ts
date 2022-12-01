import {createSelector} from '@reduxjs/toolkit';
import {
  EquipmentSelector,
  personsSelector,
} from '../../redux/site/site-selectors';
import {RootState} from '../../redux';
import {findMaterial} from '../../api/material';
import {findPersonById} from '../../api/person';
import {CategoryType} from '../../api/types/cat/common';

export const currentEquipmentPersonSelector = (
  equipmentSelector: EquipmentSelector,
) =>
  createSelector(
    equipmentSelector,
    personsSelector,
    (equipmentSummary, persons) =>
      findPersonById(persons, equipmentSummary?.lastObservedOperatorId),
  );

export const currentEquipmentAreaSelector = (
  equipmentSelector: EquipmentSelector,
) =>
  createSelector(
    equipmentSelector,
    (state: RootState) => state.site.productionSummary,
    (equipmentSummary, summaries) => {
      if (equipmentSummary?.type === CategoryType.LOAD_EQUIPMENT) {
        return summaries?.loadAreaSummaries.find(
          loadAreaSummary =>
            loadAreaSummary.area.id ===
            equipmentSummary?.lastObservedLoadAreaId,
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

export const currentEquipmentMaterialSelector = (
  equipmentSelector: EquipmentSelector,
) =>
  createSelector(
    equipmentSelector,
    (state: RootState) => state.site.materials,
    (equipmentSummary, materials) => {
      return findMaterial(materials, equipmentSummary?.lastObservedMaterialId);
    },
  );
