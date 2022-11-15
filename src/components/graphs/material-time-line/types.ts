import {ScaleTime} from 'd3';
import {units} from 'minestar-units';

import {Material} from '../../../api/types/cat/material';
import {MaterialLegend} from '../../../api/types';

import {PatternType} from '../pattern/types';

import {TimeData} from '../types';

export interface MaterialTimeLineType {
  legend: MaterialLegend[];
  now?: number;
  timeline?: Segment[];
  width: number;
  x_scale: ScaleTime<number, number>;
}
export type MaterialWithMeta = Material & {
  quantity: units.Quantity;
  patternDetails: PatternType;
  patternId: string;
};

export type Segment = [TimeData, TimeData];
