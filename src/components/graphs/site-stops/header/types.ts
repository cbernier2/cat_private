import {ScaleTime} from 'd3';

export interface SiteStopsHeaderType {
  addStop: () => void;
  headerHeight: number;
  height: number;
  steps: Date[];
  scale: ScaleTime<number, number, any>;
  width: number;
}
