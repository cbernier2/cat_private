import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, ForeignObject, G, Text} from 'react-native-svg';

import useCatTheme from '../../hooks/useCatTheme';

import {EquipmentIconType, ForeignEquipmentIconType} from './types';
import {equipmentIconMap} from './map';

export const EquipmentIcon: React.FC<EquipmentIconType> = props => {
  const theme = useCatTheme();

  // TODO compute colours and stuff
  const iconColor = theme.colors.errorWarning0;
  const fillColor = theme.colors.surface;
  const borderColor = theme.colors.errorWarning0;

  const Icon = equipmentIconMap[props.equipment.type];

  return (
    <View style={{width: props.width, height: props.height}}>
      <Svg width={props.width} height={props.height} viewBox="0 0 50 50">
        <Circle
          cx="50%"
          cy="50%"
          fill={fillColor}
          strokeWidth={3}
          stroke={borderColor}
          r={21}
        />
        <ForeignObject x={7} y={7}>
          {Icon && <Icon width={36} height={36} fill={iconColor} />}
        </ForeignObject>
        <G display={props.badge ? '' : 'none'}>
          <Circle cx={38} cy={38} r={12} fill={theme.colors.errorWarning0} />
          <Text
            textAnchor="middle"
            x={38}
            y={43}
            fontSize={14}
            fontFamily="Roboto"
            fontWeight="bold"
            fill={theme.colors.onErrorContainer}>
            {Number(props.badge) > 9 ? '9+' : props.badge}
          </Text>
        </G>
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
