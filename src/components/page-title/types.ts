import {MinestarIconName} from '../minestar-icon/types';

export interface PageTitleType {
  icon: MinestarIconName;
  onBack?: () => void;
  title: string | undefined;
}
