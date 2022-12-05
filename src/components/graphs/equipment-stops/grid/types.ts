import {ScaleTime} from 'd3';

export interface GridType {
  height: number;
  labelWidth: number;
  time_scale: ScaleTime<number, number>;
  width: number;
}
