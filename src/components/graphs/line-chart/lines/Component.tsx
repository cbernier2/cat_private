import React from 'react';
import {area, line} from 'd3';
import {Path} from 'react-native-svg';

import {MathUtils} from '../../../../utils/math-utils';

import {TimeData} from '../../types';

import {LinesType} from './types';

export const Lines: React.FC<LinesType> = props => {
  const {
    maxThreshold,
    minThreshold,
    projected,
    target,
    values,
    x_scale,
    y_scale,
  } = props;

  if (!values.length || !projected.length) {
    return null;
  }

  const [y_min] = y_scale.domain();

  const currentFill = '#08cb361e';
  const metStroke = '#21e33ccc';
  const notMetStroke = '#f44336cc';
  const projectedFill = '#03a9f41e';
  const targetStroke = '#f0f5fa';
  const thresholdFill = '#d8d8d833';

  const draw = (data: TimeData[]): string =>
    line<TimeData>()
      .y(d => y_scale(d.value))
      .x(d => x_scale(d.time))(data)!;

  const targetMet = (data: TimeData): boolean => {
    if (data.time && minThreshold.length) {
      const minAt = MathUtils.getTimeSeriesValueAt(data.time, minThreshold)!;

      if (maxThreshold.length) {
        const maxAt = MathUtils.getTimeSeriesValueAt(data.time, maxThreshold)!;
        return minAt <= data.value && data.value <= maxAt;
      }

      return minAt <= data.value;
    }

    return true;
  };

  const lastValue = values[values.length - 1] ?? [];
  const lastProjected = projected[projected.length - 1] ?? [];
  const currentStroke =
    targetMet(lastValue) || targetMet(lastProjected) ? metStroke : notMetStroke;

  // Start data line on y_min for prettier chart
  const lineData = [{time: values[0].time, value: y_min}, ...values];
  // Start and end fill polies on y_min, so they close properly.
  const fillData = [...lineData, {time: lastValue.time, value: y_min}];
  const projectedData = [
    // Make sure projected properly connects with current.
    {time: lastValue.time, value: y_min},
    lastValue,
    ...projected,
    {time: lastProjected.time, value: y_min},
  ];

  const currentLine = draw(lineData);
  const currentArea = draw(fillData);
  const projectedArea = draw(projectedData);

  const targetLine = draw(target);

  let thresholdArea = '';
  const thresholdTop = maxThreshold.length ? maxThreshold : target;
  if (thresholdTop.length && thresholdTop.length === minThreshold.length) {
    const areaData = minThreshold.map((datum, i) => ({
      x: datum.time,
      y0: datum.value,
      y1: thresholdTop[i].value,
    }));

    thresholdArea = area<any>()
      .y0(d => y_scale(d.y0))
      .y1(d => y_scale(d.y1))
      .x(d => x_scale(d.x))(areaData)!;
  }

  return (
    <>
      <Path d={currentLine} stroke={currentStroke} strokeWidth="2" />
      <Path d={currentArea} fill={currentFill} />
      <Path d={projectedArea} fill={projectedFill} />

      <Path d={targetLine} stroke={targetStroke} strokeWidth="1" />
      <Path d={thresholdArea} fill={thresholdFill} />
    </>
  );
};
