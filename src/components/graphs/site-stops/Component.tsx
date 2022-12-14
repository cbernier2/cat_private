import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Dimensions} from 'react-native';
import Svg, {Circle, Defs, G, Line} from 'react-native-svg';
import * as scale from 'd3-scale';

import useCatTheme from '../../../hooks/useCatTheme';
import {IStop} from '../../../redux/stops/types';

import {Pattern} from '../pattern/Component';

import {SiteStopsChartType} from './types';

import EquipmentsMock from './equipement.mock.json';
import StopsMock from './stops.mock.json';
import {SiteStopsEquipments} from './equipments/Component';
import {SiteStopsHeader} from './header/Component';
import {SiteStopsStops} from './stops/Component';
import {Equipment} from '../../../api/types/cat/equipment';

const window = Dimensions.get('window');

export const SiteStopsChart: React.FC<SiteStopsChartType> = ({steps}) => {
  const theme = useCatTheme();
  const equipments = EquipmentsMock as Equipment[];
  const stops = StopsMock as IStop[];

  const rowHeight = 50;
  const headerHeight = 40;
  const labelWidth = 150;

  const [width, setWidth] = useState(window.width);
  const height = headerHeight + rowHeight + equipments.length * rowHeight;

  const now = moment().toDate();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', d => {
      setWidth(d.window.width);
    });
    return () => subscription?.remove();
  }, [setWidth]);

  const equipment_band = scale
    .scaleBand()
    .domain(equipments.map(e => e.id))
    .range([headerHeight + rowHeight, height]);

  const x_time = scale
    .scaleTime()
    .domain([
      steps[0],
      moment(steps[steps.length - 1])
        .add({minutes: 15})
        .toDate(),
    ])
    .range([labelWidth, width])
    .clamp(true);

  const addObservation = () => console.log('Add Observation');
  const addStop = () => console.log('Add Site Wide Stop');

  return (
    <Svg height={height} width={width}>
      <Defs>
        <Pattern background={'#555'} pattern="PATTERN_07" foreground="red" />
        <Pattern background={'#555'} pattern="PATTERN_07" foreground="blue" />
      </Defs>
      <SiteStopsHeader
        addStop={addStop}
        headerHeight={headerHeight}
        height={height}
        steps={steps}
        scale={x_time}
        width={width}
      />
      <SiteStopsEquipments
        equipments={equipments}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        scale={equipment_band}
        width={width}
      />
      <SiteStopsStops
        addObservation={addObservation}
        now={now}
        stops={stops}
        x_scale={x_time}
        y_scale={equipment_band}
      />
      {now >= steps[0] && now <= steps[steps.length - 1] && (
        <G>
          <Circle
            cx={x_time(now)}
            cy={headerHeight - 6}
            r={3}
            fill={theme.colors.errorWarning0}
          />
          <Line
            x={x_time(now)}
            y1={headerHeight - 4}
            y2={height}
            stroke={theme.colors.errorWarning0}
            strokeWidth={2}
          />
        </G>
      )}
    </Svg>
  );
};
