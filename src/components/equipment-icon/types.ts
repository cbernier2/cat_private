import {IEquipment} from '../../redux/equipments/types';

export interface EquipmentIconType {
  equipment: IEquipment;
  height?: number;
  width?: number;
  badge?: number;
}

export interface ForeignEquipmentIconType extends EquipmentIconType {
  x?: number;
  y?: number;
}
