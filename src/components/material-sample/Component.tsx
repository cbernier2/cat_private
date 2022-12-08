import React from 'react';
import Svg, {Defs, Rect} from 'react-native-svg';
import {Pattern} from '../graphs/pattern/Component';
import {getPatternId} from '../graphs/pattern/functions';
import {MaterialSampleType} from './types';

const MaterialSample: React.FC<MaterialSampleType> = ({material, size}) => {
  return (
    <Svg width={size} height={size}>
      <Defs>
        <Pattern
          background={material.color}
          pattern={material.pattern}
          foreground={material.patternColor}
        />
      </Defs>
      <Rect
        width={'100%'}
        height={'100%'}
        rx={4}
        ry={4}
        fill={`url(#${getPatternId(
          material.color,
          material.pattern,
          material.patternColor,
        )})`}
      />
    </Svg>
  );
};

export default MaterialSample;
