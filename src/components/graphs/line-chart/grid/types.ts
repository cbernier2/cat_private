import {ScaleLinear, ScaleTime} from 'd3';

export interface GridType {
  x_scale: ScaleTime<number, number>;
  y_scale: ScaleLinear<number, number>;
}
