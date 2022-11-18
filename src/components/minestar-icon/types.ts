import {IconProps} from 'react-native-vector-icons/Icon';
import {minestarIconsMap} from './icons-map';

export type MinestarIconName = keyof typeof minestarIconsMap;

export interface MinestarIconProps extends IconProps {
  name: MinestarIconName;
}
