import React from 'react';
import {LinearGradient, Stop} from 'react-native-svg';

import {GradiantType} from '../types';

export const Gradiant: React.FC<GradiantType> = props => {
  const {id, fill} = props;

  return (
    <LinearGradient id={id} x1="0%" x2="0%" y1="0%" y2="100%">
      <Stop offset="0%" stopOpacity="0.75" stopColor={fill} />
      <Stop offset="15%" stopOpacity="0.85" stopColor={fill} />
      <Stop offset="68%" stopOpacity="0.85" stopColor={fill} />
      <Stop offset="100%" stopOpacity="0.65" stopColor={fill} />
    </LinearGradient>
  );
};
