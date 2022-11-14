import React from 'react';
import {Pattern, Rect} from 'react-native-svg';

import {FlatType} from '../types';

export const Flat: React.FC<FlatType> = props => {
  const {id, fill} = props;

  return (
    <Pattern id={id} patternUnits="userSpaceOnUse" width="5" height="5">
      <Rect width="5" height="5" fill={fill} />
    </Pattern>
  );
};
