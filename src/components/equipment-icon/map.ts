import {SvgProps} from 'react-native-svg';

import {EquipmentType} from '../../redux/equipments/types';

import Dozer from '../../../assets/icons/dozer.svg';
import LightVehicle from '../../../assets/icons//light_vehicle.svg';
import Scraper from '../../../assets/icons//scraper.svg';

type EquipmentIconMap = {
  [K in EquipmentType]?: React.FC<SvgProps>;
};

export const equipmentIconMap: EquipmentIconMap = {
  Dozer,
  LightVehicle,
  Scraper,
};
