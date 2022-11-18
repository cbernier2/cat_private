import {ScaleBand} from 'd3';
import {Equipment} from '../../../../api/types/cat/equipment';

export interface SiteStopsEquipmentsType {
  equipments: Equipment[];
  headerHeight: number;
  rowHeight: number;
  scale: ScaleBand<any>;
  width: number;
}
