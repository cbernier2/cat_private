import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';

export const isAttentionRequired = (summary: CatSiteSummary) => {
  if (summary.projectedValue && summary.targetValue) {
    return summary.projectedValue < summary.targetValue;
  } else {
    return false;
  }
};
