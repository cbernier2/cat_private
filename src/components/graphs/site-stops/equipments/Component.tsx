import React from 'react';
import {useTranslation} from 'react-i18next';
import {G, Text, Line} from 'react-native-svg';

import {ForeignEquipmentIcon} from '../../../equipment-icon/Component';

import {SiteStopsEquipmentsType} from './types';
import {EquipmentIconUtils} from '../../../../api/types/cat/equipment';
import {MinestarIconName} from '../../../minestar-icon/types';

export const SiteStopsEquipments: React.FC<SiteStopsEquipmentsType> = props => {
  const {t} = useTranslation();
  const fontSize = 12;

  return (
    <>
      <Text
        fontSize={12}
        x={10}
        y={props.headerHeight + props.rowHeight / 2 + 6}
        fill="white">
        {t('site_stops').toUpperCase()}
      </Text>
      {props.equipments.map(equipment => {
        return (
          <G key={equipment.id}>
            <Line
              x1={0}
              x2={props.width}
              y={props.scale(equipment.id)}
              stroke={'white'}
              strokeWidth={1}
            />
            <ForeignEquipmentIcon
              iconSize={25}
              iconColor={'red'}
              fillColor={'black'}
              padding={4}
              name={
                EquipmentIconUtils.getIcon(equipment.type) as MinestarIconName
              }
              // TODO random representation until we know how this is supposed to work
              badge={Math.max(0, Math.floor(Math.random() * 16) - 5)}
              x={10}
              y={props.scale(equipment.id)! + props.rowHeight / 2 - 11}
            />
            <Text
              fontSize={fontSize}
              x={40}
              y={
                props.scale(equipment.id)! + props.rowHeight / 2 + fontSize / 2
              }
              fill="white">
              {equipment.name.trim()}
            </Text>
          </G>
        );
      })}
    </>
  );
};
