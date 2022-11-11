import {ProductionSummary} from '../../../api/types/cat/production';

import {transformSiteSummary} from './transformSiteSummary';
import {Material} from '../../../api/types/cat/material';
import {UnitType} from '../../../api/types/cat/common';

export const transformSummaries = (
  summaries: ProductionSummary,
  materials: Material[],
  defaultUnit: UnitType,
) => {
  if (!summaries) {
    return null;
  }

  return {
    ...summaries,
    siteSummary: transformSiteSummary(
      summaries.siteSummary,
      materials,
      defaultUnit,
    ),
    siteLoadSummary: transformSiteSummary(
      summaries.siteLoadSummary,
      materials,
      defaultUnit,
    ),
  };
};
