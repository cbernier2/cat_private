import {IStop} from '../../../../redux/stops/types';
import {ScaleBand, ScaleTime} from 'd3';
import {Moment} from 'moment';

export interface SiteStopsStopsType {
  addObservation: () => void;
  now: Moment;
  stops: IStop[];
  x_scale: ScaleTime<number, number, any>;
  y_scale: ScaleBand<any>;
}
