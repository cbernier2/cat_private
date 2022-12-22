import React from 'react';
import {CatEquipmentIconType} from './types';
import {equipmentIconDataSelector} from './selectors';
import {getEquipmentIcon} from '../../api/types/equipment';
import useCatSelector from '../../hooks/useCatSelector';
import {CircledIcon} from '../circled-icon/Component';

export const CatEquipmentIcon: React.FC<CatEquipmentIconType> = ({
  equipmentSummary,
  type,
  size = 40,
}) => {
  const equipmentIconData = useCatSelector(state =>
    equipmentIconDataSelector(state, equipmentSummary),
  );

  return (
    <CircledIcon
      size={size}
      iconColor={equipmentIconData.statusColor}
      badge={
        equipmentIconData.observationCount >= 3
          ? equipmentIconData.observationCount
          : undefined
      }
      name={getEquipmentIcon(equipmentSummary.equipment, type)}
    />
  );
};
