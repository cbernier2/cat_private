import {EquipmentType} from '../../src/redux/equipments/types';

import Dozer from './dozer.svg';
import LightVehicle from './light_vehicle.svg';
import Scraper from './scraper.svg';

type EquipmentIconMap = {
  [K in EquipmentType]?: Object;
};

export const equipmentIconMap: EquipmentIconMap = {
  Dozer,
  LightVehicle,
  Scraper,
};
