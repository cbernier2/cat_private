import {TimeData} from '../types';

export interface LineChartType {
  endTime: number;
  maxThreshold?: TimeData[];
  minThreshold?: TimeData[];
  projected?: TimeData[];
  startTime: number;
  target?: TimeData[];
  values: TimeData[];
}
