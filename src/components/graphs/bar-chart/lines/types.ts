import {ScaleLinear, ScaleTime} from 'd3';

export interface LinesType {
  average: number | null;
  maxThreshold: number | null;
  minThreshold: number | null;
  target: number | null;
  x_scale: ScaleTime<number, number>;
  y_scale: ScaleLinear<number, number>;
}
