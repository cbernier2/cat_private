import React from 'react';
import {Defs, Polygon} from 'react-native-svg';

import {Pattern} from '../../pattern/Component';
import {getPatternFromId, getPatternId} from '../../pattern/functions';
import {PatternType} from '../../pattern/types';

import {BarData, BarsType} from './types';

export const Bars = (props: BarsType) => {
  const {maxThreshold, minThreshold, target, values, x_scale, y_scale} = props;

  const [x_min, x_max] = x_scale.domain();
  const barPadding = 1;
  const chartWidth = x_scale(x_max) - x_scale(x_min);
  const barWidth = Math.max(0.5, chartWidth / values.length - 2 * barPadding);

  const bars: BarData[] = [];

  const drawBar = (bar: BarData): string => {
    const y1 = y_scale(bar.lowerValue);
    const y2 = y_scale(bar.upperValue);

    const x1 = x_scale(bar.time) + barPadding;
    const x2 = x1 + barWidth;

    return `${x1},${y2} ${x2},${y2} ${x2},${y1} ${x1},${y1}`;
  };

  const isWithinThresholds = (value: number) =>
    (minThreshold ?? 0) <= value && value <= (maxThreshold ?? 0);

  values.forEach(data => {
    const total = data.hasOwnProperty('value2')
      ? Number(data.value) + Number(data.value2)
      : Number(data.value);

    let pattern: PatternType = {background: '#08cb3680'};
    if (target) {
      pattern = {background: '#08cb36B3'};

      if (!isWithinThresholds(data.value) && !isWithinThresholds(total)) {
        pattern = {background: '#ec4c40B3'};
      }
    }

    bars.push({
      time: data.time,
      lowerValue: 0,
      upperValue: data.value,
      patternId: getPatternId(pattern.background),
    });

    if (target) {
      bars.push({
        time: data.time,
        lowerValue: data.value,
        upperValue: total,
        patternId: getPatternId(
          'transparent',
          'PATTERN_07',
          pattern.background,
        ),
      });
    }
  });

  const patterns = Array.from(new Set<string>(bars.map(bar => bar.patternId)));

  return (
    <>
      <Defs>
        {patterns.map((patternId, i) => (
          <Pattern key={`p${i}`} {...getPatternFromId(patternId)} />
        ))}
      </Defs>
      {bars.map((bar, i) => (
        <Polygon
          key={`b${i}`}
          points={drawBar(bar)}
          fill={`url(#${bar.patternId})`}
        />
      ))}
    </>
  );
};
