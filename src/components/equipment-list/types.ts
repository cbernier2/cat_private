import {haulCyclesEquipmentSelector} from '../../redux/site/site-selectors';
import {MainContext} from '../../redux/site/site-slice';

export type CatEquipmentListType = {
  equipment: ReturnType<typeof haulCyclesEquipmentSelector>;
  context: MainContext;
};
