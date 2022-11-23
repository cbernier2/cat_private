import {CatScreenType} from '../screen/types';
import {MinestarIconName} from '../minestar-icon/types';

export type CatChildScreenType = CatScreenType & {
  childTitle: string | undefined;
  iconName: MinestarIconName;
};
