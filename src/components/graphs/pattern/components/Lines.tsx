import React from 'react';
import {Path, Pattern, Rect} from 'react-native-svg';

import {LinesType} from '../types';

export const Lines: React.FC<LinesType> = props => {
  const {background, id, paths, size, shapeRendering, stroke, strokeWidth} =
    props;

  return (
    <Pattern id={id} patternUnits="userSpaceOnUse" width={size} height={size}>
      {background && <Rect width={size} height={size} fill={background} />}
      {paths.map(path => (
        <Path
          key={`${id}-${path}`}
          d={path}
          stroke-width={strokeWidth}
          shape-rendering={shapeRendering}
          stroke={stroke}
          stroke-linecap="square"
        />
      ))}
    </Pattern>
  );
};
