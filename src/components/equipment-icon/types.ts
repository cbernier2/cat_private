import {MinestarIconName} from '../minestar-icon/types';
import {ColorValue} from 'react-native';

export interface EquipmentIconType {
  name: MinestarIconName;
  iconSize?: number;
  padding?: number;
  borderWidth?: number;
  badgeRadius?: number;
  badge?: number;
  iconColor: ColorValue;
  fillColor?: ColorValue;
  borderColor?: ColorValue;
}

export interface ForeignEquipmentIconType extends EquipmentIconType {
  x?: number;
  y?: number;
}
