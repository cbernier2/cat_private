import {units} from 'minestar-units';

import {PatternType} from '../../../pattern/types';

export interface LegendItemType {
  name: string;
  pattern: PatternType;
  patternId: string;
  quantity: units.Quantity;
}
