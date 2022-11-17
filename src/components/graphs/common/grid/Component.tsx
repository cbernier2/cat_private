import React from 'react';
import {useSelector} from 'react-redux';
import {G, Line, Polygon, Text} from 'react-native-svg';
import moment from 'moment-timezone';

import {
  shiftNominalOperationalTimelineSelector,
  siteClockIs24HourSelector,
} from '../../../../redux/site/site-selectors';

import {GridType} from './types';

// TODO review colours, currently using css from webapp
export const Grid: React.FC<GridType> = props => {
  const {x_scale, y_scale} = props;
  const nominalOperationalTime = useSelector(
    shiftNominalOperationalTimelineSelector,
  );
  const clockIs24 = useSelector(siteClockIs24HourSelector);

  const timeFormat = clockIs24 ? 'HH:mm' : 'ha';

  const [x_min, x_max] = x_scale.domain();
  const x_0 = x_scale(x_min);
  const x_100 = x_scale(x_max);

  const end = x_max.getTime();
  const start = x_min.getTime();

  const [y_min] = y_scale.domain();
  const y_0 = y_scale(y_min);

  const stroke = '#4b5055';
  const text = '#4b5055';
  const timelineFill = '#464b508c';

  const shiftHours = (end - start) / (60 * 60 * 1000);
  const firstHour = moment(start).startOf('hour').valueOf();

  const x_steps = shiftHours;
  const x_step_length = (end - start) / x_steps;
  const verticalLines = Array.apply(null, Array(x_steps + 1)).map((_, i) => {
    const value = firstHour + i * x_step_length;
    const hour = moment(value).format(timeFormat);
    return {
      x: x_scale(value),
      value: i % 2 ? hour : '',
    };
  });

  const y_ticks: number[] =
    y_scale.ticks(3).filter(tick => !y_scale.domain().includes(tick)) ?? [];

  const horizontalLines = y_ticks.map(value => ({
    y: y_scale(value),
    value: value,
  }));

  const backgroundTimeline: string[] =
    nominalOperationalTime?.map((operation: any) => {
      const x1 = x_scale(operation.startTime);
      const x2 = x_scale(operation.endTime);

      return `${x1},0 ${x1},${y_0} ${x2},${y_0} ${x2},0`;
    }) ?? [];

  return (
    <G>
      {verticalLines.map(line => (
        <G key={`v${line.x}`}>
          <Text
            fontSize={14}
            x={line.x}
            y={y_0 + 15}
            fill={text}
            textAnchor="middle">
            {line.value}
          </Text>
          <Line x={line.x} y1={0} y2={y_0} stroke={stroke} />
        </G>
      ))}
      {horizontalLines.map(line => (
        <G key={`h${line.y}`}>
          <Text
            fontSize={14}
            x={x_0 - 5}
            y={line.y + 5}
            fill={text}
            textAnchor="end">
            {line.value}
          </Text>
          <Line x1={x_0} x2={x_100} y={line.y} stroke={stroke} />
        </G>
      ))}
      <Text
        fontSize={14}
        x={x_0 - 5}
        y={y_0 - 1.5}
        fill={text}
        textAnchor="end">
        {y_min}
      </Text>
      <Line x1={0} x2={x_100} y={y_0} stroke={stroke} />
      {backgroundTimeline.map(points => (
        <Polygon key={points} points={points} fill={timelineFill} />
      ))}
    </G>
  );
};
