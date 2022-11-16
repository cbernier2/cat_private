import {MaterialLegend} from '../../../api/types';
import {TimeData} from '../types';
import {Segment} from '../material-time-line/types';

export interface LineChartType {
  endTime?: number;
  materialLegend?: MaterialLegend[];
  materialTime?: Segment[];
  maxThreshold?: TimeData[];
  minThreshold?: TimeData[];
  projected?: TimeData[];
  startTime?: number;
  target?: TimeData[];
  values?: TimeData[];
}
