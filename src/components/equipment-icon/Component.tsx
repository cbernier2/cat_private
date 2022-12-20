import React from 'react';
import {CatEquipmentIconType, CatForeignEquipmentIconType} from './types';
import {equipmentIconDataSelector} from './selectors';
import {getEquipmentIcon} from '../../api/types/equipment';
import useCatSelector from '../../hooks/useCatSelector';
import {CircledIcon, ForeignCircledIcon} from '../circled-icon/Component';

export const CatEquipmentIcon = (props: CatEquipmentIconType) => {
  const {equipmentSummary, type, size = 40, iconSize} = props;

  const equipmentIconData = useCatSelector(state =>
    equipmentIconDataSelector(state, equipmentSummary),
  );

  return (
    <CircledIcon
      size={size}
      iconSize={iconSize}
      iconColor={equipmentIconData.statusColor}
      badge={
        equipmentIconData.observationCount > 3
          ? equipmentIconData.observationCount
          : undefined
      }
      name={getEquipmentIcon(equipmentSummary.equipment, type)}
    />
  );
};

export const CatForeignEquipmentIcon = (props: CatForeignEquipmentIconType) => {
  const {equipmentSummary, type} = props;

  const equipmentIconData = useCatSelector(state =>
    equipmentIconDataSelector(state, equipmentSummary),
  );

  return (
    <ForeignCircledIcon
      {...props}
      iconColor={equipmentIconData.statusColor}
      badge={
        equipmentIconData.observationCount > 3
          ? equipmentIconData.observationCount
          : undefined
      }
      name={getEquipmentIcon(equipmentSummary.equipment, type)}
    />
  );
};
