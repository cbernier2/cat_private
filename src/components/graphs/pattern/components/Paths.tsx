import React from 'react';
import {Path, Pattern, Rect} from 'react-native-svg';

import {PathsType} from '../types';

export const Paths: React.FC<PathsType> = props => {
  const {
    background,
    fill,
    height,
    id,
    path,
    shapeRendering,
    size,
    stroke,
    strokeWidth,
    width,
  } = props;
  const tHeight = size * height;
  const tWidth = size * width;

  return (
    <Pattern
      id={id}
      patternUnits="userSpaceOnUse"
      width={tWidth}
      height={tHeight}>
      {background && <Rect width={tWidth} height={tHeight} fill={background} />}
      <Path
        d={path}
        stroke-width={strokeWidth}
        shape-rendering={shapeRendering}
        fill={fill}
        stroke={stroke}
        stroke-linecap="square"
      />
    </Pattern>
  );
};
