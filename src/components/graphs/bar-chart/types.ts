import {MaterialLegend} from '../../../api/types';
import {Segment} from '../material-time-line/types';
import {TimeData} from '../types';

export interface BarChartType {
  average?: number;
  endTime?: number;
  materialLegend?: MaterialLegend[];
  materialTime?: Segment[];
  maxThreshold?: number;
  minThreshold?: number;
  showIf?: boolean;
  startTime?: number;
  target?: number;
  values?: TimeData[];
}
