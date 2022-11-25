import React from 'react';
import {useSelector} from 'react-redux';
import Svg, {Defs, Polygon, Text} from 'react-native-svg';
import moment from 'moment-timezone';

import {
  materialsSelector,
  siteClockIs24HourSelector,
} from '../../../redux/site/site-selectors';

import {getPatternId} from '../pattern/functions';
import {NowMarker} from '../common/now-marker/Component';
import {Pattern} from '../pattern/Component';

import {Legend} from './legend/Component';
import {MaterialTimeLineType, MaterialWithMeta, Segment} from './types';
import {findMaterials} from '../../../api/material';

export const MaterialTimeLine: React.FC<MaterialTimeLineType> = props => {
  const {legend, now = moment().valueOf(), timeline, width, x_scale} = props;

  const clockIs24 = useSelector(siteClockIs24HourSelector);
  const materials = findMaterials(
    useSelector(materialsSelector),
    legend.map(material => material.id),
  ).map(m => ({
    ...m,
    ...legend.find(l => l.id === m.id),
    patternDetails: {
      background: m.color,
      pattern: m.pattern,
      foreground: m.patternColor,
    },
    patternId: getPatternId(m.color, m.pattern, m.patternColor),
  })) as MaterialWithMeta[];

  const timeFormat = clockIs24 ? 'HH:mm' : 'h:mma';

  const [x_min, x_max] = x_scale.domain();
  const x_0 = x_scale(x_min);
  const x_100 = x_scale(x_max);

  const height = 40;
  const barHeight = 20;

  const containerFill = '#000';
  const containerPoints = `${x_0},0 ${x_0},${barHeight} ${x_100},${barHeight} ${x_100},0`;

  const drawSegmentPoints = (segment: Segment) => {
    const x0 = x_scale(segment[0].time);
    const x1 = x_scale(segment[1].time);

    return `${x0},0 ${x0},${barHeight} ${x1},${barHeight} ${x1},0`;
  };

  const getPatternUrl = (mId: string): string => {
    const id = materials.find(m => m.id === mId)!.patternId;
    return `url(#${id})`;
  };

  const FirstMarker: React.FC = () => {
    if (timeline?.length) {
      const first = timeline[0][0].time;

      return (
        <Text
          fill="#4b5055"
          fontSize={11}
          x={x_scale(first)}
          y={barHeight + 12}>
          {moment(first).format(timeFormat)}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <Svg width={width} height={height}>
        <Defs>
          {materials.map(material => (
            <Pattern key={material.id} {...material.patternDetails} />
          ))}
        </Defs>
        <Polygon points={containerPoints} fill={containerFill} />
        {timeline?.map((segment, i) => (
          <Polygon
            key={`s${i}`}
            points={drawSegmentPoints(segment)}
            fill={getPatternUrl(segment[0].value)}
          />
        ))}
        <NowMarker now={now} x_scale={x_scale} y1={0} y2={barHeight} />
        <FirstMarker />
      </Svg>
      <Legend materials={materials} />
    </>
  );
};
