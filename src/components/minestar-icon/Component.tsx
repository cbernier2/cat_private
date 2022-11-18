import {createIconSet} from 'react-native-vector-icons';
import {minestarIconsMap} from './icons-map';
import React from 'react';
import {MinestarIconProps} from './types';

const Icon = createIconSet(minestarIconsMap, 'minestar-icons');

export const MinestarIcon: React.FC<MinestarIconProps> = props => (
  <Icon {...props} />
);
