import React from 'react';
import {area, line} from 'd3';
import {Path} from 'react-native-svg';

import {LinesType} from './types';

export const Lines: React.FC<LinesType> = props => {
  const {average, maxThreshold, minThreshold, target, x_scale, y_scale} = props;

  const x_domain = x_scale.domain();

  const averageStroke = '#f0f5fa';
  const targetStroke = '#f0f5fa';
  const thresholdFill = '#d8d8d833';

  const draw = (value: number): string =>
    line<any>()
      .y(() => y_scale(value))
      .x(x => x_scale(x))(x_domain)!;

  const averageLine = average ? draw(average) : '';
  const targetLine = target ? draw(target) : '';

  let thresholdArea = '';
  const thresholdTop = maxThreshold ? maxThreshold : target;
  if (thresholdTop && minThreshold) {
    const areaData = x_domain.map(x => ({
      x,
      y0: minThreshold,
      y1: thresholdTop,
    }));

    thresholdArea = area<any>()
      .y0(d => y_scale(d.y0))
      .y1(d => y_scale(d.y1))
      .x(d => x_scale(d.x))(areaData)!;
  }

  return (
    <>
      <Path
        d={averageLine}
        stroke={averageStroke}
        strokeDasharray="9,9"
        strokeWidth="1"
      />
      <Path d={targetLine} stroke={targetStroke} strokeWidth="1" />
      <Path d={thresholdArea} fill={thresholdFill} />
    </>
  );
};
