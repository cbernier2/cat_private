import React from 'react';
import {G, Polygon} from 'react-native-svg';

import {Block} from '../../equipment-stops/blocks/types';

import {StopData} from '../stopData/Component';
import {rowHeight, rowPadding, timeLabelsHeight} from '../config';

import {SiteWideStopsType} from './types';

export const SiteWideStops = (props: SiteWideStopsType) => {
  const {
    background = true,
    display = true,
    equipmentId,
    stops,
    width,
    x_scale,
    y_scale,
  } = props;

  if (!display) {
    return null;
  }

  const getCoordinates = (stop: Block) => {
    const y1 =
      (y_scale ? y_scale(equipmentId)! : timeLabelsHeight) + rowPadding;
    const y2 = y1 + rowHeight - rowPadding * 2;

    // Because we don't clamp x_scale within its domain
    //  Manually clamp it withing the SVGs horizontal space
    const x1 = Math.max(0, x_scale(stop.start));
    const x2 = Math.min(width, x_scale(stop.end));

    return {x1, x2, y1, y2};
  };

  return (
    <>
      {stops.map((stop, i) => {
        const {x1, x2, y1, y2} = getCoordinates(stop);
        const points = `${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1}`;
        const centerY = y1 + rowHeight / 2;
        const coordinates = {centerY, x1, x2, y1, y2};

        return (
          <G key={i}>
            <Polygon points={points} fill={`url(#${stop.patternId})`} />
            <StopData
              coordinates={coordinates}
              display={!background}
              stop={stop}
            />
          </G>
        );
      })}
    </>
  );
};
