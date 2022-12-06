import {EquipmentSummary} from '../../../api/types/cat/production';
import {Material} from '../../../api/types/cat/material';
import {EquipmentType, UnitType} from '../../../api/types/cat/common';
import {Equipment} from '../../../api/types/cat/equipment';
import {transformSiteSummary} from './transformSiteSummary';
import {pick} from 'lodash';

export const transformEquipSummary = (
  type: EquipmentType,
  equipSummary: EquipmentSummary,
  equipment: Equipment | undefined,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  return {
    ...transformSiteSummary(equipSummary, materials, defaultUnit),
    ...pick(
      equipSummary,
      'fuelLevelPercent',
      'lastObservedLoadAreaId',
      'lastObservedDumpAreaId',
      'lastObservedOperatorId',
      'lastObservedMaterialId',
      'lastObservedDestinationAreaId',
      'maintenanceTimeline',
      'standbyTimeline',
      'operationalDelayTimeline',
    ),
    type,
    equipment,
  };
};
