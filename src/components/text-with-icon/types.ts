import React, {ComponentProps} from 'react';
import {Text} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {ColorValue} from 'react-native';

export type CatTextWithIconType = ComponentProps<typeof Text> & {
  iconNode?: React.ReactNode;
  icon?: React.FC<SvgProps>;
  iconSize?: number;
  iconColor?: ColorValue;
};
