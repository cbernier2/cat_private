import {ScaleTime} from 'd3';
import {Moment} from 'moment';

export interface SiteStopsHeaderType {
  addStop: () => void;
  headerHeight: number;
  height: number;
  steps: Moment[];
  scale: ScaleTime<number, number, any>;
  width: number;
}
