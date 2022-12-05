import React from 'react';
import {useSelector} from 'react-redux';
import {G, Line, Text} from 'react-native-svg';
import moment from 'moment-timezone';

import {siteClockIs24HourSelector} from '../../../../redux/site/site-selectors';

import {GridType} from './types';

export const Grid = (props: GridType) => {
  const {height, labelWidth, time_scale, width} = props;
  const clockIs24 = useSelector(siteClockIs24HourSelector);

  const stroke = '#4b5055';
  const text = '#4b5055';

  const timeFormat = clockIs24 ? 'HH:mm' : 'ha';

  const [min, max] = time_scale.domain();

  const end = max.getTime();
  const start = min.getTime();

  const shiftHours = (end - start) / (60 * 60 * 1000);
  const firstHour = moment(start).startOf('hour').valueOf();

  const y_steps = shiftHours;
  const y_step_length = (end - start) / y_steps;
  const horizontalLines = Array.apply(null, Array(y_steps + 1)).map((_, i) => {
    const value = firstHour + i * y_step_length;
    const hour = moment(value).format(timeFormat);
    return {
      y: time_scale(value),
      value: hour,
    };
  });

  return (
    <>
      <Line x={labelWidth} y1={0} y2={height} stroke={stroke} />
      {horizontalLines.map(line => (
        <G key={`h${line.y}`}>
          <Text
            fontSize={14}
            x={labelWidth / 2}
            y={line.y + 5}
            fill={text}
            textAnchor="middle">
            {line.value}
          </Text>
          <Line x1={60} x2={width} y={line.y} stroke={stroke} />
        </G>
      ))}
    </>
  );
};
