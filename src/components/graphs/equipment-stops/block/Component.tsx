import React from 'react';
import {Defs, G, Mask, Polygon, Text} from 'react-native-svg';

import useCatTheme from '../../../../hooks/useCatTheme';

import {ForeignCircledIcon} from '../../../circled-icon/Component';

import {BlockType} from './types';

export const Block = (props: BlockType) => {
  const {block, blockPadding, height, maskPoints, points, x1, x2, y1} = props;
  const {colors} = useCatTheme();

  const left = x1 + blockPadding;
  const right = x2 - blockPadding;

  const iconSpacing = 20;
  const iconYOffset = 3;

  const durationYOffset = 16;

  const minHeightForLabel = 40;
  const labelYOffset = 35;

  const textColor = colors.onSurface;

  return (
    <>
      <Defs>
        <Mask id={`mask${block.index}`}>
          <Polygon fill="white" points={maskPoints} />
        </Mask>
      </Defs>
      <Polygon points={points} fill={`url(#${block.patternId})`} />

      <G mask={`url(#mask${block.index})`}>
        {block.icons?.map((icon, i) => (
          <ForeignCircledIcon
            key={`i${icon}${i}`}
            x={x1 + iconSpacing * i}
            y={y1 - iconYOffset}
            fillColor={null}
            name={icon}
            iconColor={textColor}
          />
        ))}
        <Text
          x={right}
          y={y1 + durationYOffset}
          fill={textColor}
          textAnchor={'end'}>
          {block.duration}
        </Text>
        {height >= minHeightForLabel && (
          <Text x={left} y={y1 + labelYOffset} fill={textColor}>
            {block.label}
          </Text>
        )}
      </G>
    </>
  );
};
