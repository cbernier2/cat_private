import {haulCyclesEquipmentSelector} from '../../redux/site/site-selectors';

export type CatEquipmentListType = {
  equipment: ReturnType<typeof haulCyclesEquipmentSelector>;
  isSearch: boolean;
};
