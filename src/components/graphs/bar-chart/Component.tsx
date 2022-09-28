/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Svg, {Line, Path} from 'react-native-svg';
import {curveLinear, line} from 'd3';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {Grid} from '../grid/Component';

/*
  Built on from the following examples:
  https://github.com/friyiajr/D3LineChartSample/blob/solution/src/LineChart.tsx
  https://github.com/JesperLekland/react-native-svg-charts/blob/dev/src/bar-chart/bar-chart.js
 */

export const BarChart = () => {
  const height = 150;
  const width = 250;

  // Data can be in any[] format. It's up to us to map it properly in the interpolation functions
  //  via x/ySelectors()
  const data = Array.from({length: 12}, (_, i) => ({
    value: Math.floor(Math.random() * 400),
    date: new Date(`2022-01-01 ${`00${i + 6}`.slice(-2)}:00:00`),
  }));

  // Domain is the range of values we are playing with
  // Range is the space we are playing with. Invert max and min for the Y axis since SVG has zero at the top
  // If we wish to have margins for labels they have to accounted for here e.g.: range([height - margin , 0])
  const y = scale.scaleLinear().domain([0, 400]).range([height, 0]);

  // scaleBand domain is required to be a string
  const x_band = scale
    .scaleBand()
    .domain(data.map(d => d.date.toString()))
    .range([0, width])
    .padding(0.1);

  const x_time = scale
    .scaleTime()
    .domain([new Date('2022-01-01 06:00:00'), new Date('2022-01-01 18:00:00')])
    .range([0, width]);

  const areas = data
    .map((bar, index) => ({
      bar,
      path: shape
        .area<any>()
        .y0(y(0))
        .y1(d => y(d.value))
        .x(
          (d, _index) =>
            (_index === 0
              ? x_band(d.date.toString())
              : x_band(d.date.toString())! + x_band.bandwidth())!,
        )
        // I don't get why we need to pass ([data[index], data[index]]) here but ([data[index]]) doesn't work
        .defined(d => typeof d.value === 'number')([data[index], data[index]]),
    }))
    .filter(
      area => area.bar !== null && area.bar !== undefined && area.path !== null,
    );

  // The same Y can be used with a different X and vice-versa
  const lines = line<any>()
    .y(d => y(d.value))
    .x(d => x_time(d.date))
    .curve(curveLinear)(data);

  // Finding a specific point an any axis
  const now = () => {
    return (
      <Line
        x={x_time(new Date('2022-01-01 9:32:55'))}
        y1={0}
        y2={height}
        stroke={'red'}
        strokeWidth={1}
      />
    );
  };

  return (
    <>
      <Svg style={{height, width, backgroundColor: 'black'}}>
        <Grid height={height} width={width} ySections={3} />
        {areas.map((area, index) => {
          const {path} = area;

          return <Path key={index} fill="white" d={path!} />;
        })}
        {now()}
      </Svg>

      <Svg
        style={{
          marginTop: 50,
          height,
          width,
          backgroundColor: 'black',
        }}>
        <Grid height={height} width={width} xSections={6} ySections={2} />
        <Path d={lines!} stroke="white" strokeWidth="2" />
        {now()}
      </Svg>
    </>
  );
};
