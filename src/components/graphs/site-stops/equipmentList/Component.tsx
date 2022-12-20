import React from 'react';
import {useTranslation} from 'react-i18next';
import SVG, {G, Line, Polygon, Text} from 'react-native-svg';
import * as scale from 'd3-scale';

import useCatTheme from '../../../../hooks/useCatTheme';

import {CatForeignEquipmentIcon} from '../../../equipment-icon/Component';

import {rowHeight, timeLabelsHeight} from '../config';

import {EquipmentListType} from './types';

export const EquipmentList = (props: EquipmentListType) => {
  const {equipments, withSiteStopsRow = true} = props;

  const {t} = useTranslation();
  const {colors} = useCatTheme();

  const headerHeight = timeLabelsHeight + (withSiteStopsRow ? rowHeight : 0);
  const height = headerHeight + equipments.length * rowHeight;
  const width = 150;
  const fontSize = 12;
  const textColour = colors.onBackground;
  const stroke = colors.grey30;

  const y_scale = scale
    .scaleBand()
    .domain(equipments.map(e => e.id))
    .range([headerHeight, height]);

  const navigateToEquipment = (id: string) => {
    // TODO CATPS-58 Navigate to Equipment Screen
    console.log(id);
  };

  return (
    <SVG width={width} height={height}>
      {withSiteStopsRow && (
        <>
          <Line x1={0} x2={width} y={timeLabelsHeight} stroke={stroke} />
          <Text
            fontSize={fontSize}
            x={10}
            y={timeLabelsHeight + rowHeight / 2 + fontSize / 2}
            fill={textColour}>
            {t('cat.site_stops').toUpperCase()}
          </Text>
        </>
      )}
      {equipments.map(equipment => {
        const topY = y_scale(equipment.id) ?? 0;
        const botY = topY + rowHeight;
        const points = `0,${topY} 0,${botY} ${width},${botY} ${width},${topY}`;

        return (
          <G key={equipment.id}>
            <Polygon
              points={points}
              onPress={() => navigateToEquipment(equipment.id)}
            />
            <Line x1={0} x2={width} y={topY} stroke={stroke} />
            <CatForeignEquipmentIcon
              key={`e${equipment.id}`}
              size={30}
              iconSize={36}
              equipmentSummary={equipment}
              type={equipment.type}
              x={10}
              y={topY + rowHeight / 2 - 15}
            />
            <Text
              fontSize={fontSize}
              x={50}
              y={topY + rowHeight / 2 + fontSize / 2}
              fill={textColour}>
              {equipment.equipment?.name.trim()}
            </Text>
          </G>
        );
      })}
      <Line x1={0} x2={width} y={height} stroke={stroke} />
    </SVG>
  );
};
