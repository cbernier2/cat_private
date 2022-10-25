import {IStop} from '../../../../redux/stops/types';
import {ScaleBand, ScaleTime} from 'd3';

export interface SiteStopsStopsType {
  addObservation: () => void;
  now: Date;
  stops: IStop[];
  x_scale: ScaleTime<number, number, any>;
  y_scale: ScaleBand<any>;
}
