import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import Svg, {Circle, Defs, G, Line} from 'react-native-svg';
import * as scale from 'd3-scale';

import useCatTheme from '../../../hooks/useCatTheme';
import {IEquipment} from '../../../redux/equipments/types';
import {IStop} from '../../../redux/stops/types';

import {HatchedFill} from '../fills/hatched';

import {SiteStopsChartType} from './types';

import EquipmentsMock from './equipement.mock.json';
import StopsMock from './stops.mock.json';
import {SiteStopsEquipments} from './equipments/Component';
import {SiteStopsHeader} from './header/Component';
import {SiteStopsStops} from './stops/Component';

const window = Dimensions.get('window');

export const SiteStopsChart: React.FC<SiteStopsChartType> = () => {
  const theme = useCatTheme();
  const equipments = EquipmentsMock as IEquipment[];
  const stops = StopsMock as IStop[];

  const rowHeight = 50;
  const headerHeight = 40;
  const labelWidth = 110;

  const [width, setWidth] = useState(window.width);
  const height = headerHeight + rowHeight + equipments.length * rowHeight;

  const now = new Date('2022-10-20 9:53:00');

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
    // TODO get view start and end times from current "page"
    .domain([new Date('2022-10-20 07:45:00'), new Date('2022-10-20 10:15:00')])
    .range([labelWidth, width])
    .clamp(true);

  // TODO get steps from current "page"
  const steps = [
    new Date('2022-10-20 08:00:00'),
    new Date('2022-10-20 09:00:00'),
    new Date('2022-10-20 10:00:00'),
  ];

  const addObservation = () => console.log('Add Observation');
  const addStop = () => console.log('Add Site Wide Stop');

  return (
    <Svg height={height} width={width}>
      <Defs>
        <HatchedFill />
        <HatchedFill idSuffix="blue" color="rgba(21, 151, 255, 0.3)" />
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
    </Svg>
  );
};
