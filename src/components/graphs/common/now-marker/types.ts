import {ScaleLinear, ScaleTime} from 'd3';

export interface NowMarkerType {
  now: number;
  x?: number;
  x_scale: ScaleTime<number, number>;
  y1?: number;
  y2?: number;
  y_scale?: ScaleLinear<number, number>;
}
