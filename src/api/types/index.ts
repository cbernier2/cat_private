import {ConfigItemName} from './cat/config-item';
import {Person} from './cat/person';

export type CatQueryFnParams = {
  method: string;
  path: string;
  queryParams?: Record<string, any>;
};

export type CatSiteConfig = {
  id?: string;
  name: ConfigItemName;
  startTime: number;
  deleted: boolean;
  value: any; // Seen mostly strings, some boolean, one string[]
};

export type CatConfig = {[key in ConfigItemName]?: CatSiteConfig};

export type CatPersons = {[key: string]: Person};

export type GetCountResult = {
  rowCount: number;
  rowsPerPage: number;
};

export type CatColumn = {
  key: string;
  unit: string;
};
