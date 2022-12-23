import React from 'react';
import {G, Text} from 'react-native-svg';

import {ForeignCircledIcon} from '../../../circled-icon/Component';

import {StopDataType} from './types';

export const StopData = (props: StopDataType) => {
  if (!props.display) {
    return null;
  }

  const {iconSize = 45, stop} = props;
  const {centerY, x1, x2, y1} = props.coordinates;
  const iconSpacing = iconSize * 0.66;

  const padding = 10;
  const textColor = '#fff';

  const blockWidth = x2 - x1;
  const iconsWidth = padding + iconSpacing * (stop.icons?.length ?? 0);
  const labelWidth = stop.label.length * 7;
  const timeWidth = stop.duration.length * 7;

  const showIcons = blockWidth >= iconsWidth + timeWidth + padding;
  const showLabel =
    blockWidth >= iconsWidth + labelWidth + timeWidth + padding * 2;
  const showTime = blockWidth >= timeWidth + padding;

  return (
    <G>
      {showIcons &&
        stop.icons?.map((icon, i) => (
          <ForeignCircledIcon
            key={`i${icon}${i}`}
            x={x1 + iconSpacing * i}
            y={y1}
            fillColor={null}
            name={icon}
            size={iconSize}
            iconColor={textColor}
          />
        ))}
      {showLabel && (
        <Text x={x1 + iconsWidth} y={centerY} fill={textColor}>
          {stop.label}
        </Text>
      )}
      {showTime && (
        <Text x={x2 - padding} y={centerY} fill={textColor} textAnchor={'end'}>
          {stop.duration}
        </Text>
      )}
    </G>
  );
};
