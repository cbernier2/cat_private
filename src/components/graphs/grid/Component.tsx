import React from 'react';
import {Line} from 'react-native-svg';
import {GridProps} from './types';

export const Grid = (props: GridProps) => {
  const {xSections: x = 1, ySections: y = 1} = props;

  const p = (length: number, sections: number, index: number) => {
    return (length / sections) * (index + 1);
  };

  return (
    <>
      {[...Array(y - 1)].map((_, i) => (
        <Line
          key={`y${i}`}
          x1={0}
          x2={props.width}
          y={p(props.height, y, i)}
          stroke={'rgba(255, 255, 255, 0.5)'}
          strokeWidth={1}
        />
      ))}

      {[...Array(x - 1)].map((_, i) => (
        <Line
          key={`x${i}`}
          x={p(props.width, x, i)}
          y1={0}
          y2={props.height}
          stroke={'rgba(255, 255, 255, 0.5)'}
          strokeWidth={1}
        />
      ))}
    </>
  );
};
