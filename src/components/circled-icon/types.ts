import {MinestarIconName} from '../minestar-icon/types';
import {ColorValue} from 'react-native';

export interface CircledIconType {
  badge?: number;
  borderColor?: ColorValue;
  borderWidth?: number;
  fillColor?: ColorValue;
  iconColor: ColorValue;
  iconSize?: number;
  name: MinestarIconName;
  size?: number;
}

export interface ForeignCircledIconType extends CircledIconType {
  x?: number;
  y?: number;
}
