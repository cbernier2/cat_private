import React from 'react';
import {G, Line, Text} from 'react-native-svg';

import {SiteStopsHeaderType} from './types';
import {dateToHoursString} from '../../../../utils/date-utils';

export const SiteStopsHeader: React.FC<SiteStopsHeaderType> = props => {
  return (
    <>
      {props.steps.map(step => (
        <G key={step.getTime()}>
          <Text
            fontSize={12}
            x={props.scale(step)}
            y={props.headerHeight / 2 + 6}
            fill="white"
            textAnchor="middle">
            {dateToHoursString(step)}
          </Text>
          <Line
            x={props.scale(step)}
            y1={props.headerHeight}
            y2={props.height}
            stroke={'white'}
            strokeWidth={1}
          />
          <Line
            x1={0}
            x2={props.width}
            y={props.headerHeight}
            stroke={'white'}
            strokeWidth={1}
          />
        </G>
      ))}
    </>
  );
};
