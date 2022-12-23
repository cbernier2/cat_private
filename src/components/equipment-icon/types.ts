import {CatEquipmentSummary} from '../../redux/site/helpers/transformSummaries';
import {CategoryType} from '../../api/types/cat/common';

export interface CatEquipmentIconType {
  equipmentSummary: CatEquipmentSummary;
  fillColor?: string;
  iconSize?: number;
  type: CategoryType;
  size?: number;
}

export interface CatForeignEquipmentIconType extends CatEquipmentIconType {
  x: number;
  y: number;
}
