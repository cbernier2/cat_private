import React from 'react';
import {G, Polygon} from 'react-native-svg';

import {Block} from '../../equipment-stops/blocks/types';

import {rowPadding} from '../config';
import {SiteWideStops} from '../siteWideStops/Component';
import {StopData} from '../stopData/Component';

import {EquipmentStopsType} from './types';

export const EquipmentStops = (props: EquipmentStopsType) => {
  const {
    equipmentId,
    equipmentStops,
    siteWideStops,
    width,
    x_scale,
    y_scale,
    onSelect,
  } = props;

  const bigHeight = 30;
  const smallHeight = 6;

  const getCoordinates = (stop: Block) => {
    let y1 = y_scale(equipmentId)! + rowPadding;
    let height;

    if (stop.isMaintenance && stop.isObservation) {
      y1 = y1 + 10;
      height = bigHeight;
    } else if (stop.isMaintenance && !stop.isObservation) {
      height = smallHeight;
    } else if (!stop.isMaintenance && stop.isObservation) {
      y1 = y1 + 34;
      height = smallHeight;
    } else {
      height = bigHeight;
    }

    const y2 = y1 + height;

    // Because we don't clamp x_scale within its domain
    //  Manually clamp it withing the SVGs horizontal space
    const x1 = Math.max(0, x_scale(stop.start));
    const x2 = Math.min(width, x_scale(stop.end));

    const small = height === smallHeight;
    const centerY = y1 + height / 1.5;

    return {centerY, small, x1, x2, y1, y2};
  };

  return (
    <G onPress={() => onSelect(equipmentId)}>
      <SiteWideStops
        equipmentId={equipmentId}
        stops={siteWideStops}
        width={width}
        x_scale={x_scale}
        y_scale={y_scale}
      />
      {equipmentStops.map((stop, i) => {
        const {centerY, small, x1, x2, y1, y2} = getCoordinates(stop);
        const points = `${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1}`;
        const coordinates = {centerY, small, x1, x2, y1, y2};

        return (
          <G key={i}>
            <Polygon points={points} fill={`url(#${stop.patternId})`} />
            <StopData
              coordinates={coordinates}
              display={!small}
              iconSize={30}
              stop={stop}
            />
          </G>
        );
      })}
    </G>
  );
};
