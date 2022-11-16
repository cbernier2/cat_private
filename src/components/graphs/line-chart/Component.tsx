import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Svg from 'react-native-svg';
import * as scale from 'd3-scale';
import moment from 'moment-timezone';
import {useTranslation} from 'react-i18next';

import CatText from '../../text';

import {NowMarker} from '../common/now-marker/Component';
import {MaterialTimeLine} from '../material-time-line/Component';

import {getMaxValue} from './functions';
import {Grid} from './grid/Component';
import {Lines} from './lines/Component';
import {LineChartType} from './types';
import {styles} from './styles';

const window = Dimensions.get('window');

// TODO some line-charts can have an offset (whatever that means)
//  but this is not something that can happen with siteLoad and siteDump summaries.
//  Therefore, offsets have been omitted for this iteration
export const LineChart: React.FC<LineChartType> = props => {
  const {
    endTime = 0,
    materialLegend = [],
    materialTime = [],
    maxThreshold = [],
    minThreshold = [],
    projected = [],
    startTime = 0,
    target = [],
    values = [],
  } = props;

  const {t} = useTranslation();
  const [width, setWidth] = useState(window.width - 30);
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', d => {
      setWidth(d.window.width - 30);
    });
    return () => subscription?.remove();
  }, [setWidth]);

  if (props.showIf === false) {
    return null;
  }

  if (!values || !values.length) {
    return (
      <View style={styles.noData}>
        <CatText>{t('cat.message_no_data_available')}</CatText>
      </View>
    );
  }

  const height = 225;
  const chartHeight = 200;
  const y_labelsWidth = 50;
  const now = moment().valueOf();

  const maxValue = getMaxValue(maxThreshold, target, values, projected);

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
    <>
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
        <NowMarker now={now} x_scale={x} y_scale={y} y2={height} />
      </Svg>
      <MaterialTimeLine
        legend={materialLegend}
        now={now}
        timeline={materialTime}
        width={width}
        x_scale={x}
      />
    </>
  );
};
