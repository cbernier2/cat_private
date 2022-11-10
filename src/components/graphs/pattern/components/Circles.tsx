import React from 'react';
import {Circle, Pattern, Rect} from 'react-native-svg';

import {CirclesType} from '../types';

export const Circles: React.FC<CirclesType> = props => {
  const {background, complement, id, fill, radius, size, stroke, strokeWidth} =
    props;

  const corners = [
    [0, 0],
    [0, size],
    [size, 0],
    [size, size],
  ];

  return (
    <Pattern id={id} patternUnits="userSpaceOnUse" width={size} height={size}>
      {background && <Rect width={size} height={size} fill={background} />}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {complement &&
        corners.map(corner => (
          <Circle
            key={`${id}-${corner}`}
            cx={corner[0]}
            cy={corner[1]}
            r={radius}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        ))}
    </Pattern>
  );
};
