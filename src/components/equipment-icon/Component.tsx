import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, ForeignObject, G, Text} from 'react-native-svg';

import useCatTheme from '../../hooks/useCatTheme';

import {EquipmentIconType, ForeignEquipmentIconType} from './types';
import {MinestarIcon} from '../minestar-icon';

export const EquipmentIcon: React.FC<EquipmentIconType> = props => {
  const {colors} = useCatTheme();

  const {
    name,
    iconColor = colors.label,
    fillColor,
    borderColor,
    borderWidth = 6,
    iconSize = 28,
    badgeRadius = 9,
    padding = 12,
    badge,
  } = props;

  const svgSize = iconSize + padding + borderWidth + (badge ? badgeRadius : 0);
  const iconXY = (svgSize - iconSize) / 2;

  return (
    <View style={{width: svgSize, height: svgSize}}>
      <Svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}>
        {borderColor !== undefined && (
          <Circle
            cx="50%"
            cy="50%"
            fill={borderColor}
            r={(iconSize + padding + borderWidth) / 2}
          />
        )}
        {fillColor !== undefined && (
          <Circle
            cx="50%"
            cy="50%"
            fill={fillColor}
            r={(iconSize + padding) / 2}
          />
        )}
        <ForeignObject x={iconXY} y={iconXY}>
          <MinestarIcon name={name} color={iconColor} size={iconSize} />
        </ForeignObject>
        {badge !== undefined && (
          <>
            <Circle
              cx={svgSize - badgeRadius}
              cy={svgSize - badgeRadius}
              r={badgeRadius}
              fill={colors.error}
            />
            <Text
              textAnchor="middle"
              x={svgSize - badgeRadius}
              y={svgSize - badgeRadius + 4}
              fontSize={14}
              fontFamily="Roboto"
              fontWeight="bold"
              fill={colors.onErrorContainer}>
              {Number(props.badge) > 9 ? '9+' : props.badge}
            </Text>
          </>
        )}
      </Svg>
    </View>
  );
};

export const ForeignEquipmentIcon: React.FC<
  ForeignEquipmentIconType
> = props => {
  const {x, y, ...rest} = props;
  return (
    <>
      <ForeignObject x={x} y={y}>
        <EquipmentIcon {...rest} />
      </ForeignObject>
    </>
  );
};
