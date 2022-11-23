import {EquipmentSummary} from '../../../api/types/cat/production';
import {Material} from '../../../api/types/cat/material';
import {CategoryType, UnitType} from '../../../api/types/cat/common';
import {Equipment} from '../../../api/types/cat/equipment';
import {transformSiteSummary} from './transformSiteSummary';
import {pick} from 'lodash';

export const transformEquipSummary = (
  categoryType: CategoryType,
  equipSummary: EquipmentSummary,
  equipment: Equipment | undefined,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  return {
    ...transformSiteSummary(equipSummary, materials, defaultUnit),
    ...pick(equipSummary, 'fuelLevelPercent'),
    categoryType,
    equipment,
  };
};
