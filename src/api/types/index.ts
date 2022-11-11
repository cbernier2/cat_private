import {ConfigItemName} from './cat/config-item';

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
  name: string;
  startTime: number;
  deleted: boolean;
  value: any; // Seen mostly strings, some boolean, one string[]
};

export type SiteConfig = {[key in ConfigItemName]?: any};
