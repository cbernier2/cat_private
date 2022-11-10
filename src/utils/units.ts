import {units} from 'minestar-units';

export const numberWithCommas = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const unitTranslateKey = (unit: units.Unit) => {
  return 'cat.unit_' + unit.name;
};
