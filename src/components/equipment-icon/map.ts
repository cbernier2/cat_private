import {SvgProps} from 'react-native-svg';

import {EquipmentType} from '../../redux/equipments/types';

import Dozer from 'node_modules/minestar-icons/svg/dozer.svg';
import LightVehicle from 'node_modules/minestar-icons/svg//light_vehicle.svg';
import Scraper from 'node_modules/minestar-icons/svg//scraper.svg';

type EquipmentIconMap = {
  [K in EquipmentType]?: React.FC<SvgProps>;
};

export const equipmentIconMap: EquipmentIconMap = {
  Dozer,
  LightVehicle,
  Scraper,
};
