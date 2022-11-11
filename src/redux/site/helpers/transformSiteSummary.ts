import {Summary} from '../../../api/types/cat/production';
import {
  getPreferredMeasurementBasis,
  toTimeData,
} from '../../../utils/production-utils';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';
import {UnitUtils} from '../../../utils/unit-utils';

export const transformSiteSummary = (
  summary: Summary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  const unitType: UnitType = getPreferredMeasurementBasis(
    summary,
    materials,
    defaultUnit,
  );

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
  let unitData = {};

  switch (unitType) {
    case UnitType.LOAD:
      unitData = {
        cumulativeValues: toTimeData(
          summary.cumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeLoads?.values ?? [],
          summary.loadUnit,
        ),
      };
      break;

    case UnitType.MASS:
      unitData = {
        cumulativeValues: toTimeData(
          summary.cumulativeMass?.values ?? [],
          summary.massUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeMass?.values ?? [],
          summary.massUnit,
        ),
      };
      break;

    case UnitType.VOLUME:
      unitData = {
        cumulativeValues: toTimeData(
          summary.cumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
        projectedCumulativeValues: toTimeData(
          summary.projectedCumulativeVolume?.values ?? [],
          summary.volumeUnit,
        ),
      };
      break;
  }

  return {
    ...summary, // TODO still dump the whole thing for now, but we'll want to remove it latter
    id: summary.id, // Some data we keep raw
    name: summary.name,
    ...commonData,
    ...unitData,
    // TODO add anything else that is needed for other views
  };
};
