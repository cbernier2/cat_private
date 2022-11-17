import {ScaleLinear, ScaleTime} from 'd3';

import {TimeData} from '../../types';

export interface BarsType {
  maxThreshold: number | null;
  minThreshold: number | null;
  target: number | null;
  values: TimeData[];
  x_scale: ScaleTime<number, number>;
  y_scale: ScaleLinear<number, number>;
}

export interface BarData {
  time: number;
  lowerValue: number;
  upperValue: number;
  patternId: string;
}
