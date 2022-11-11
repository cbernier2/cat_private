import {ScaleLinear, ScaleTime} from 'd3';
import {TimeData} from '../../types';

export interface LinesType {
  maxThreshold: TimeData[];
  minThreshold: TimeData[];
  projected: TimeData[];
  target: TimeData[];
  values: TimeData[];
  x_scale: ScaleTime<number, number>;
  y_scale: ScaleLinear<number, number>;
}
