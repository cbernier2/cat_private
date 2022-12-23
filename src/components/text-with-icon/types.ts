import React, {ComponentProps} from 'react';
import {Text} from 'react-native-paper';
import {ColorValue, ViewStyle} from 'react-native';
import {MinestarIconName} from '../minestar-icon/types';

export type CatTextWithIconType = ComponentProps<typeof Text> & {
  icon: MinestarIconName | React.ReactNode;
  iconSize?: number;
  iconColor?: ColorValue;
  containerStyle?: ViewStyle;
};
