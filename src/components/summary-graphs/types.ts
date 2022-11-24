import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';
import {
  CatAreaSummary,
  CatEquipmentSummary,
  CatRouteSummary,
} from '../../redux/site/helpers/transformSummaries';

export interface SummaryGraphsType {
  defaultView?: GraphType;
  summary:
    | CatSiteSummary
    | CatRouteSummary
    | CatAreaSummary
    | CatEquipmentSummary;
}

export type GraphType = 'line' | 'bar';
