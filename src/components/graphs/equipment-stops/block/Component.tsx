import React from 'react';
import {Defs, G, Mask, Polygon, Text} from 'react-native-svg';

import {ForeignCircledIcon} from '../../../circled-icon/Component';

import {BlockType} from './types';

export const Block = (props: BlockType) => {
  const {block, blockPadding, height, maskPoints, points, scale, x1, x2} =
    props;

  const left = x1 + blockPadding;
  const right = x2 - blockPadding;

  const iconSpacing = 20;
  const iconYOffset = 3;

  const durationYOffset = 16;

  const minHeightForLabel = 40;
  const labelYOffset = 35;

  const textColor = '#fff';

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
            y={scale(block.start) - iconYOffset}
            fillColor={null}
            name={icon}
            iconColor={textColor}
          />
        ))}
        <Text
          x={right}
          y={scale(block.start) + durationYOffset}
          fill={textColor}
          textAnchor={'end'}>
          {block.duration}
        </Text>
        {height >= minHeightForLabel && (
          <Text x={left} y={scale(block.start) + labelYOffset} fill={textColor}>
            {block.label}
          </Text>
        )}
      </G>
    </>
  );
};
