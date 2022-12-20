import {ScaleBand, ScaleTime} from 'd3';

import {CatEquipmentSummaryWithObservations} from '../../../../redux/site/helpers/transformSummaries';

export interface GridType {
  equipments: CatEquipmentSummaryWithObservations[];
  x_scale: ScaleTime<number, number, any>;
  y_scale: ScaleBand<any>;
}
