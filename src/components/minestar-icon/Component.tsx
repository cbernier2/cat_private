import {createIconSet} from 'react-native-vector-icons';
import {glyphMap} from './glyph-map';
import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';

export interface MinestarIconProps extends IconProps {
  name: keyof typeof glyphMap;
}

const Icon = createIconSet(glyphMap, 'minestar-icons');

export const MinestarIcon: React.FC<MinestarIconProps> = props => (
  <Icon {...props} />
);
