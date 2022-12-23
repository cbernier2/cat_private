import React from 'react';
import {useSelector} from 'react-redux';
import {G, Line, Polygon, Text} from 'react-native-svg';
import moment from 'moment-timezone';

import {
  shiftNominalOperationalTimelineSelector,
  siteClockIs24HourSelector,
} from '../../../../redux/site/site-selectors';
import useCatTheme from '../../../../hooks/useCatTheme';

import {rowHeight, timeLabelsHeight} from '../config';

import {GridType} from './types';

export const Grid = (props: GridType) => {
  const {equipments, x_scale, y_scale} = props;

  const {colors} = useCatTheme();
  const clockIs24 = useSelector(siteClockIs24HourSelector);
  const nominalOperationalTime = useSelector(
    shiftNominalOperationalTimelineSelector,
  );

  const [x_min, x_max] = x_scale.domain();
  const y_max = y_scale.domain().pop();

  const timeFormat = clockIs24 ? 'HH:mm' : 'ha';
  const topY = timeLabelsHeight;
  const height = (y_scale(y_max) ?? 0) + rowHeight;
  const width = x_scale(x_max) + 40;

  const backgroundTimeline: string[] =
    nominalOperationalTime?.map((operation: any) => {
      const x1 = x_scale(operation.startTime);
      const x2 = x_scale(operation.endTime);

      return `${x1},${topY} ${x1},${height} ${x2},${height} ${x2},${topY}`;
    }) ?? [];

  // TODO Fix in other places too
  const stroke = colors.grey30;
  const text = colors.grey30;
  const timelineFill = '#464b508c';

  const end = x_max.getTime();
  const start = x_min.getTime();

  const shiftHours = (end - start) / (60 * 60 * 1000);
  const firstHour = moment(start).startOf('hour').valueOf();

  const x_steps = shiftHours;
  const x_step_length = (end - start) / x_steps;
  const verticalLines = Array.apply(null, Array(x_steps + 1)).map((_, i) => {
    const value = Math.max(firstHour + i * x_step_length, x_min.valueOf());
    const hour = moment(value).format(timeFormat);
    return {
      x: x_scale(value),
      value: hour,
    };
  });

  return (
    <>
      <Line x1={0} x2={width} y={topY} stroke={stroke} />
      {verticalLines.map(line => (
        <G key={line.x}>
          <Text
            fontSize={14}
            x={line.x}
            y={timeLabelsHeight / 2}
            fill={text}
            textAnchor="middle">
            {line.value}
          </Text>
          <Line x={line.x} y1={topY} y2={height} stroke={stroke} />
        </G>
      ))}
      {equipments.map(equipment => (
        <Line
          key={equipment.id}
          x1={0}
          x2={width}
          y={y_scale(equipment.id)}
          stroke={stroke}
        />
      ))}
      <Line x1={0} x2={width} y={height} stroke={stroke} />
      {backgroundTimeline.map(points => (
        <Polygon key={points} points={points} fill={timelineFill} />
      ))}
    </>
  );
};
