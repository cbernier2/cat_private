import {Equipment, EquipmentIconUtils} from './cat/equipment';
import {Category, CategoryType} from './cat/common';
import {MinestarIconName} from '../../components/minestar-icon/types';

export const getEquipmentIcon = (
  equipment: Equipment | undefined,
  categoryType: CategoryType,
): MinestarIconName => {
  return (
    equipment?.type
      ? EquipmentIconUtils.getIcon(equipment.type)
      : Category.findByCategoryType(categoryType).icon
  ) as MinestarIconName;
};
