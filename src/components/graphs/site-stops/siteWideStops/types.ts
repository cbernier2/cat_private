import {ScaleBand, ScaleTime} from 'd3';

import {Block} from '../../equipment-stops/blocks/types';

export interface SiteWideStopsType {
  background?: boolean;
  display?: boolean;
  equipmentId: string;
  stops: Block[];
  width: number;
  x_scale: ScaleTime<any, any>;
  y_scale?: ScaleBand<any>;
  onSelect: () => void;
}
