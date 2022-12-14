import {ObservationWithReasonType} from '../../../api/types/cat/observation';
import {TimelineWithReasonType} from '../../../api/types/cat/production';

export interface EquipmentStopsType {
  endTime?: number;
  observations: ObservationWithReasonType[];
  startTime?: number;
  timelines: TimelineWithReasonType[];
}
