import {Summary} from './types/cat/production';
import {CategoryType, UnitType} from './types/cat/common';
import {Material} from './types/cat/material';
import {UnitUtils} from '../utils/unit-utils';
import {units} from 'minestar-units';
import {ArrayUtils} from '../utils/array-utils';
import {CatColumn} from './types';

// From Cat's web app: src/common/providers/production/production.service.ts
export const getPreferredMeasurementBasis = (
  summary: Summary | undefined,
  materials: Material[],
  defaultUnitType: UnitType,
): UnitType => {
  if (!summary || !materials) {
    return defaultUnitType;
  }

  // Use the target unit if the summary has a target
  if (summary.target && summary.targetUnit) {
    return (
      UnitUtils.toUnitType(units.Unit.of(summary.targetUnit).quantityType) ||
      defaultUnitType
    );
  }

  if (summary['@type'] === CategoryType.MATERIAL) {
    // The summary is a material production summary, so use the preferred measurement basis of the material being summarised
    let material = materials.find(
      (materialItem: Material) => materialItem.id === summary.id,
    );
    if (material && material.preferredMeasurementBasis) {
      return material.preferredMeasurementBasis;
    }
  }

  // Check if all of the materials contained in the production summary have the same preferred measurement basis.
  // If so, use that value instead of the default measurement basis unit defined for the system.
  if (summary.materialLoads) {
    // Get the materials from the materialLoads property, and determine the preferred measurement
    // basis values for the materials.
    let distinctTypes: UnitType[] = ArrayUtils.toDistinctArray(
      Object.keys(summary.materialLoads)
        .map((materialId: string) =>
          materials.find((material: Material) => material.id === materialId),
        )
        .map(material => {
          if (material && material.preferredMeasurementBasis) {
            // Material has a preferred measurement basis.  Use it
            return material.preferredMeasurementBasis;
          } else {
            // Material either does not exist or does not have a preferred measurement basis.
            // Use the default
            return defaultUnitType;
          }
        }),
    );

    if (distinctTypes.length === 1) {
      // All the materials have the same preferred measurement basis.  Use it
      return distinctTypes[0];
    }
  }

  return defaultUnitType;
};

// Base on Cat's web app: src/common/pages/site-board/bottom-panel/bottom-panel-summary-abstract.card.ts
const summaryColumns = {
  total: {
    [UnitType.MASS]: {key: 'totalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {key: 'totalVolume', unit: 'preferredProdVolumeUnit'},
    [UnitType.LOAD]: {key: 'totalLoads', unit: 'loadUnit'},
  },
  average: {
    [UnitType.MASS]: {key: 'averageMassRate', unit: 'massFlowRateUnit'},
    [UnitType.VOLUME]: {
      key: 'averageVolumeRate',
      unit: 'preferredProdVolumetricFlowRateUnit',
    },
    [UnitType.LOAD]: {key: 'averageLoadRate', unit: 'loadRateUnit'},
  },
  projected: {
    [UnitType.MASS]: {key: 'projectedTotalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'projectedTotalVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'projectedTotalLoads', unit: 'loadUnit'},
  },
  currentHour: {
    [UnitType.MASS]: {key: 'currentHourMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'currentHourVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'currentHourLoads', unit: 'loadUnit'},
  },
  variation: {
    [UnitType.MASS]: {key: 'variationMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'variationVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'variationLoads', unit: 'loadUnit'},
  },
  shiftToDate: {
    [UnitType.MASS]: {key: 'totalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {key: 'totalVolume', unit: 'preferredProdVolumeUnit'},
    [UnitType.LOAD]: {key: 'totalLoads', unit: 'loadUnit'},
  },
};

export const SUMMARY_COLUMNS: {
  [column in keyof typeof summaryColumns]: {[unit in UnitType]: CatColumn};
} = summaryColumns;

export const TARGET_COLUMN: CatColumn = {key: 'target', unit: 'targetUnit'};
