import React from 'react';
import {G, Line, Text, Rect} from 'react-native-svg';

import {SiteStopsHeaderType} from './types';

export const SiteStopsHeader: React.FC<SiteStopsHeaderType> = props => {
  return (
    <>
      {/* TODO no ripple effect on svg press, button should probably be outside of SVG
           and placed on top of it, if we want the animation.
           Unless we want to go crazy and symbolize a ripple effect for SVG interactions.
           Which would allow us to have a ripple effect on Stops when adding observations.*/}
      <Rect
        x={20}
        y={8}
        width={70}
        height={24}
        fill="#03A9F4"
        rx={5}
        onPress={props.addStop}
      />
      <Line x={55} y1={13} y2={27} strokeWidth={3} stroke="#000" />
      <Line x1={48} x2={62} y={20} strokeWidth={3} stroke="#000" />

      {props.steps.map(step => (
        <G key={step.getTime()}>
          <Text
            fontSize={12}
            x={props.scale(step)}
            y={props.headerHeight / 2 + 6}
            fill="white"
            textAnchor="middle">
            {step.toTimeString().split(' ')[0].substring(0, 5)}
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
