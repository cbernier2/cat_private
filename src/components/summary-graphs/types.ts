import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';

export interface SummaryGraphsType {
  defaultView?: GraphType;
  summary: CatSiteSummary;
}

export type GraphType = 'line' | 'bar';
