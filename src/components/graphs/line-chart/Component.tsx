import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import Svg from 'react-native-svg';
import * as scale from 'd3-scale';
import moment from 'moment-timezone';

import {siteTimezoneSelector} from '../../../redux/site/site-selectors';

import {NowMarker} from '../common/now-marker/Component';

import {getMaxValue} from './functions';
import {Grid} from './grid/Component';
import {Lines} from './lines/Component';
import {LineChartType} from './types';

const window = Dimensions.get('window');

// TODO some line-charts can have an offset (whatever that means)
//  but this is not something that can happen with siteLoad and siteDump summaries.
//  Therefore, offsets have been omitted for this iteration
export const LineChart: React.FC<LineChartType> = props => {
  const {
    endTime,
    maxThreshold = [],
    minThreshold = [],
    projected = [],
    startTime,
    target = [],
    values,
  } = props;

  const timezone = useSelector(siteTimezoneSelector);

  const height = 225;
  const chartHeight = 200;
  const y_labelsWidth = 50;
  const [width, setWidth] = useState(window.width - 30);
  const now = moment.tz(timezone).valueOf();

  const maxValue = getMaxValue(maxThreshold, target, values, projected);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', d => {
      setWidth(d.window.width - 30);
    });
    return () => subscription?.remove();
  }, [setWidth]);

  const x = scale
    .scaleTime()
    .domain([startTime, endTime])
    .range([y_labelsWidth, width])
    .clamp(true);

  const y = scale
    .scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight, 0])
    .nice(3);

  return (
    <Svg height={height} width={width}>
      <Grid x_scale={x} y_scale={y} />
      <Lines
        maxThreshold={maxThreshold}
        minThreshold={minThreshold}
        projected={projected}
        target={target}
        values={values}
        x_scale={x}
        y_scale={y}
      />
      <NowMarker now={now} x_scale={x} y_scale={y} />
      {/* TODO ForeignObject material-time-line? */}
    </Svg>
  );
};
