import {units} from 'minestar-units';

import {ConfigItemName} from './cat/config-item';
import {Person} from './cat/person';

export type CatQueryFnParams = {
  method: string;
  path: string;
  queryParams?: Record<string, any>;
};

export type GetCountResult = {
  rowCount: number;
  rowsPerPage: number;
};

export type CatSiteConfig = {
  id?: string;
  name: ConfigItemName;
  startTime: number;
  deleted: boolean;
  value: any; // Seen mostly strings, some boolean, one string[]
};

export type SiteConfig = {[key in ConfigItemName]?: any};
export type CatPersons = {[key: string]: Person};
export type CatColumn = {
  key: string;
  unit: string;
};

export interface MaterialLegend {
  id: string;
  quantity: units.Quantity;
}