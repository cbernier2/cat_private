import {ObservationWithReasonType} from '../../../api/types/cat/observation';
import {TimelineWithReasonType} from '../../../api/types/cat/production';

import {CatStopsFiltersType} from '../../stops-filters/types';

export interface EquipmentStopsType {
  endTime?: number;
  filters: CatStopsFiltersType;
  observations: ObservationWithReasonType[];
  startTime?: number;
  timelines: TimelineWithReasonType[];
}
