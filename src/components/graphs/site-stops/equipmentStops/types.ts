import {ScaleBand, ScaleTime} from 'd3';

import {Block} from '../../equipment-stops/blocks/types';

export interface EquipmentStopsType {
  equipmentId: string;
  equipmentStops: Block[];
  siteWideStops: Block[];
  width: number;
  x_scale: ScaleTime<any, any>;
  y_scale: ScaleBand<any>;
}
