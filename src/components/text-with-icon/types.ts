import React, {ComponentProps} from 'react';
import {Text} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {ColorValue} from 'react-native';

export type CatTextWithIconType = ComponentProps<typeof Text> & {
  icon: React.FC<SvgProps>;
  iconColor?: ColorValue;
};
