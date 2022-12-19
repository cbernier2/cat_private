import React from 'react';
import {View} from 'react-native';
import Svg from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import * as scale from 'd3-scale';
import moment from 'moment-timezone';

import {useGraphWidth} from '../../../hooks/useGraphWidth';

import CatText from '../../text';
import {withShowIf} from '../../with-show-if/Component';

import {styles} from '../line-chart/styles';
import {Grid} from '../common/grid/Component';
import {NowMarker} from '../common/now-marker/Component';
import {MaterialTimeLine} from '../material-time-line/Component';

import {BarChartType} from './types';
import {getMaxValue} from './functions';
import {Lines} from './lines/Component';
import {Bars} from './bars/Component';

export const BarChart = withShowIf((props: BarChartType) => {
  const {
    average = null,
    endTime = 0,
    materialLegend = [],
    materialTime = [],
    maxThreshold = null,
    minThreshold = null,
    startTime = 0,
    target = null,
    values = [],
  } = props;

  const {t} = useTranslation();
  const width = useGraphWidth();

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

  const maxValue = getMaxValue(average, maxThreshold, target, values);

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
        <Bars
          maxThreshold={maxThreshold}
          minThreshold={minThreshold}
          target={target}
          values={values}
          x_scale={x}
          y_scale={y}
        />
        <Lines
          average={average}
          maxThreshold={maxThreshold}
          minThreshold={minThreshold}
          target={target}
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
});
