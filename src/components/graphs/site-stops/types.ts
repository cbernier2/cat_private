import {CatEquipmentSummaryWithObservations} from '../../../redux/site/helpers/transformSummaries';
import {ObservationWithReasonType} from '../../../api/types/cat/observation';

import {CatStopsFiltersType} from '../../stops-filters/types';

export interface SiteStopsChartType {
  equipments: CatEquipmentSummaryWithObservations[];
  filters: CatStopsFiltersType;
  siteStops: ObservationWithReasonType[];
  withSiteStopsRow?: boolean;
  onSelect: () => void;
}
