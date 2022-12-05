import React from 'react';
import Svg from 'react-native-svg';
import * as scale from 'd3-scale';
import moment from 'moment/moment';

import {useWidth} from '../../../hooks/useWidth';

import {Grid} from './grid/Component';

import {EquipmentStopsType} from './types';

export const EquipmentStops = (props: EquipmentStopsType) => {
  const {endTime = 0, startTime = 0} = props;
  const width = useWidth();
  const labelWidth = 60;
  const padding = 30;
  const height =
    padding * 2 +
    moment.duration(moment(endTime).diff(moment(startTime))).asMinutes() * 2.5;

  const y = scale
    .scaleTime()
    .domain([startTime, endTime])
    .range([padding, height - padding])
    .clamp(true);

  return (
    <Svg height={height} width={width}>
      <Grid
        height={height}
        labelWidth={labelWidth}
        time_scale={y}
        width={width}
      />
    </Svg>
  );
};
