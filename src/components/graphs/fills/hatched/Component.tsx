import React from 'react';
import {Pattern, Path, Rect} from 'react-native-svg';

import {HatchedFillType} from './types';

export const HatchedFill: React.FC<HatchedFillType> = props => {
  const {
    background = 'rgba(60,70,80,0.1)',
    color = 'rgba(211,47,47,0.4)',
    idSuffix,
  } = props;
  const id = 'hatched-fill' + (!idSuffix ? '' : `-${idSuffix}`);

  return (
    <Pattern id={id} patternUnits="userSpaceOnUse" width="6.5" height="6.5">
      <Rect width="6.5" height="6.5" fill={background} />
      <Path
        d="M 0,6.5 l 6.5,-6.5 M -1.625,1.625 l 3.25,-3.25 M 4.875,8.125 l 3.25,-3.25"
        stroke-width="1.75"
        shape-rendering="auto"
        stroke={color}
        stroke-linecap="square"
      />
    </Pattern>
  );
};
