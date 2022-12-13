import {ScaleTime} from 'd3';

export interface NowMarkerType {
  now: number;
  scale: ScaleTime<number, number>;
  x1: number;
  x2: number;
  y?: number;
}
