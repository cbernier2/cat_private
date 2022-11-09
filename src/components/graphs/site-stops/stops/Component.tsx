import React from 'react';
import {G, Text, Defs, Mask, Rect, ForeignObject} from 'react-native-svg';

import NoReason from '../../../../../assets/icons/stop_reason_unknown.svg';

import {SiteStopsStopsType} from './types';

export const SiteStopsStops: React.FC<SiteStopsStopsType> = props => {
  const fontSize = 12;

  const display = (hide: boolean): string => (hide ? 'none' : '');

  return (
    <>
      {props.stops.map(stop => {
        // TODO compute icon, label, fill and rect format (up-thin, up-large, bottom-thin, bottom-large)
        const thinBar = stop.thin ?? false;
        const top = stop.top ?? true;
        const yAdjust = top ? 5 : thinBar ? 40 : 15;
        const barHeight = thinBar ? 5 : 30;
        const label = 'REASON VWXYZ';
        const Icon = NoReason;

        const y = props.y_scale(stop.stoppedEquipmentId)!;
        const x0 = props.x_scale(stop.startTime);
        const x1 = Math.min(
          props.x_scale(props.now),
          props.x_scale(stop.endTime),
        );
        const length = x1 - x0;
        const duration =
          stop.endTime > props.now.getTime()
            ? '∞'
            : (stop.endTime - stop.startTime) / 60000;

        const fill =
          Math.random() < 0.5
            ? 'url(#hatched-fill)'
            : 'url(#hatched-fill-blue)';

        return (
          <G key={stop.id} onPress={props.addObservation}>
            <Defs>
              <Mask id={`mask${stop.id}`}>
                <Rect
                  fill="white"
                  x={x0}
                  y={y + yAdjust}
                  width={length}
                  height={barHeight}
                />
              </Mask>
            </Defs>
            <Rect
              fill={fill}
              x={x0}
              y={y + yAdjust}
              width={length}
              height={barHeight}
            />
            <G mask={`url(#mask${stop.id})`} display={display(thinBar)}>
              <ForeignObject
                x={x0 + 3}
                y={y + yAdjust + 3}
                // @ts-ignore
                display={display(length < 40)}>
                <Icon width={24} height={24} />
              </ForeignObject>
              <Text
                x={x0 + 35}
                y={y + yAdjust + barHeight / 2 + 5}
                fontSize={fontSize}
                fill="white"
                // Try to guess text length to know whether to display it or not
                // @ts-ignore
                display={display(label.length * 7.5 + 55 > length)}>
                {label}
              </Text>
              <Text
                x={x1 - 4}
                y={y + yAdjust + barHeight / 2 + 5}
                fontSize={fontSize}
                fill="white"
                textAnchor="end"
                // @ts-ignore
                display={display(length < 20)}>
                {duration}
              </Text>
            </G>
          </G>
        );
      })}
    </>
  );
};
