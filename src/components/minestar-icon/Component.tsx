import {createIconSet} from 'react-native-vector-icons';
import {minestarIconsMap} from './icons-map';
import React from 'react';
import {MinestarIconProps} from './types';
import useCatTheme from '../../hooks/useCatTheme';

const Icon = createIconSet(minestarIconsMap, 'minestar-icons');

export const MinestarIcon: React.FC<MinestarIconProps> = props => {
  const {colors} = useCatTheme();

  return <Icon color={colors.onSurface} {...props} />;
};
