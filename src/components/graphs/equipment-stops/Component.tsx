import React from 'react';
import Svg from 'react-native-svg';
import * as scale from 'd3-scale';
import moment from 'moment/moment';

import {useWidth} from '../../../hooks/useWidth';

import {Blocks} from './blocks/Component';
import {Grid} from './grid/Component';
import {NowMarker} from './now-marker/Component';

import {EquipmentStopsType} from './types';

export const EquipmentStops = (props: EquipmentStopsType) => {
  const {endTime = 0, observations = [], startTime = 0, timelines = []} = props;
  const width = useWidth();
  const labelWidth = 60;
  const padding = 30;
  const height =
    padding * 2 +
    moment.duration(moment(endTime).diff(moment(startTime))).asMinutes() * 1.5;

  const y = scale
    .scaleTime()
    .domain([startTime, endTime])
    .range([padding, height - padding])
    .clamp(true);

  const now = moment().valueOf();

  return (
    <Svg height={height} width={width}>
      <Grid
        height={height}
        labelWidth={labelWidth}
        time_scale={y}
        width={width}
      />
      <Blocks
        labelWidth={labelWidth}
        now={now}
        observations={observations}
        scale={y}
        timelines={timelines}
        width={width}
      />
      <NowMarker now={now} scale={y} x1={labelWidth} x2={width} />
    </Svg>
  );
};
