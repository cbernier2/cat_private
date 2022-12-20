import {Block} from '../blocks/types';

export interface BlockType {
  block: Block;
  blockPadding: number;
  height: number;
  maskPoints: string;
  points: string;
  x1: number;
  x2: number;
  y1: number;
}
