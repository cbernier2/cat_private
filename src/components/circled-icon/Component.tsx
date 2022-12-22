import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Svg, {Circle, ForeignObject, Text} from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment/moment';

import useCatTheme from '../../hooks/useCatTheme';

import {MinestarIcon} from '../minestar-icon';

import {CircledIconType, ForeignCircledIconType} from './types';
import {getKey} from './functions';

export const CircledIcon: React.FC<CircledIconType> = props => {
  const {colors} = useCatTheme();
  const isFocused = useIsFocused();
  const [iOSFix, setiOSFix] = useState<string>('');

  useEffect(() => {
    if (isFocused) {
      setiOSFix(String(moment().unix()));
    }
  }, [isFocused]);

  const {
    name,
    iconColor = colors.grey100,
    fillColor = colors.grey0,
    borderColor,
    borderWidth = 3,
    size = 28,
    // TODO not all icons have the same dimensions
    //  The best way for now to keep CircledIcon's size consistent and 'padded' is to
    //   manually set iconSize individually and center the actual icon based on that number
    //  Ideally: specific icons would have their predefined appropriate sizes, but meh
    //  One complication out of this is that setting `iconSize` is not intuitive as it is based off of CircledIcon's
    //   base 50x50 dimensions and has no relation with the actual rendered size based on `size`
    iconSize = 30,
    badge,
  } = props;

  const viewBox = 50;
  const center = viewBox / 2;

  const iconXY = center - iconSize / 2;
  const radius = center - borderWidth;

  return (
    <View style={{width: size, height: size}}>
      <Svg width={size} height={size} viewBox={`0 0 ${viewBox} ${viewBox}`}>
        {(fillColor || borderColor) && (
          <Circle
            cx="50%"
            cy="50%"
            fill={fillColor ?? 'transparent'}
            stroke={borderColor ?? 'transparent'}
            strokeWidth={borderWidth}
            r={radius}
          />
        )}
        <ForeignObject key={getKey(props, iOSFix)} x={iconXY} y={iconXY}>
          <MinestarIcon name={name} color={iconColor} size={iconSize} />
        </ForeignObject>
        {badge !== undefined && (
          <>
            <Circle cx={38} cy={38} r={10} fill={colors.error} />
            <Text
              textAnchor="middle"
              x={38}
              y={43}
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

export const ForeignCircledIcon: React.FC<ForeignCircledIconType> = props => {
  const {x, y, ...rest} = props;
  return (
    <>
      <ForeignObject x={x} y={y}>
        <CircledIcon {...rest} />
      </ForeignObject>
    </>
  );
};
