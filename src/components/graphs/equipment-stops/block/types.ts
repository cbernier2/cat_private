import {ScaleTime} from 'd3';

import {Block} from '../blocks/types';

export interface BlockType {
  block: Block;
  blockPadding: number;
  height: number;
  maskPoints: string;
  points: string;
  scale: ScaleTime<any, any>;
  x1: number;
  x2: number;
}
