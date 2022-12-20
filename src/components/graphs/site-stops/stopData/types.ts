import {Block} from '../../equipment-stops/blocks/types';

export interface StopDataType {
  coordinates: {
    centerY: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  display: boolean;
  iconSize?: number;
  stop: Block;
}
