import {TextStyle} from 'react-native';

export type CatValueWithUnitType = {
  value: string;
  unit: string;
  valueStyle?: TextStyle;
  unitStyle?: TextStyle;
};
