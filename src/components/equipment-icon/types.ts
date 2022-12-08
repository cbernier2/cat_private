import {CatEquipmentSummary} from '../../redux/site/helpers/transformSummaries';
import {CategoryType} from '../../api/types/cat/common';

export interface CatEquipmentIconType {
  equipmentSummary: CatEquipmentSummary;
  type: CategoryType;
  size?: number;
}
