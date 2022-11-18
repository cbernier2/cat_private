import {EquipmentSummary} from '../../../api/types/cat/production';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';
import {Equipment} from '../../../api/types/cat/equipment';
import {transformSiteSummary} from './transformSiteSummary';

export const transformEquipSummary = (
  equipSummary: EquipmentSummary,
  equipment: Equipment,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  return {
    ...transformSiteSummary(equipSummary, materials, defaultUnit),
    equipment,
  };
};
