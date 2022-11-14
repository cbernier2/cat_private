import {Summary} from '../../../api/types/cat/production';
import {
  getPreferredMeasurementBasis,
  toTimeData,
} from '../../../utils/production-utils';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';
import {UnitUtils} from '../../../utils/unit-utils';

const getUnitData = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  const unitType: UnitType = getPreferredMeasurementBasis(
    summary,
    materials,
    defaultUnit,
  );

  switch (unitType) {
    case UnitType.LOAD:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
      };

    case UnitType.MASS:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeMass?.values ?? [],
          summary.massUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeMass?.values ?? [],
          summary.massUnit,
        ),
      };

    default:
      return {
        cumulativeValues: toTimeData(
          summary.cumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
      };
  }
};

export const transformSiteSummary = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  // TODO replicated transformations found in the web app, but numbers don't see to match what we see in it
  //  e.g.: 527.1040744695023 volume does not change on mobile but shows 689 on web...
  const commonData = {
    cumulativeTarget: toTimeData(
      summary.cumulativeTarget?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
    cumulativeTargetMaxThreshold: toTimeData(
      summary.cumulativeTargetMaxThreshold?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
    cumulativeTargetMinThreshold: toTimeData(
      summary.cumulativeTargetMinThreshold?.values ?? [],
      UnitUtils.toBaseUnit(summary.targetUnit)?.name ?? '',
    ),
  };

  return {
    id: summary.id, // Some data we keep raw
    name: summary.name,
    ...commonData,
    ...getUnitData(summary, materials, defaultUnit),
    summary, // TODO still dump the whole thing for now, but we'll want to remove it latter
    // TODO add anything else that is needed for other views
  };
};
