import {ConfigItemName} from './cat/config-item';
import {Person} from './cat/person';

export type CatQueryFnParams = {
  method: string;
  path: string;
  queryParams?: Record<string, any>;
};

export type CatConfig = {[key in ConfigItemName]?: any};

export type CatPersons = {[key: string]: Person};

export type GetCountResult = {
  rowCount: number;
  rowsPerPage: number;
};
