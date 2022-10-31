import {ScaleBand} from 'd3';

import {IEquipment} from '../../../../redux/equipments/types';

export interface SiteStopsEquipmentsType {
  equipments: IEquipment[];
  headerHeight: number;
  rowHeight: number;
  scale: ScaleBand<any>;
  width: number;
}
