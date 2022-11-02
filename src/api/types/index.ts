import {Summary} from './cat/production';
import {Shift} from './cat/shift';

export type CatQueryFnParams = {
  method: string;
  path: string;
  queryParams?: Record<string, any>;
};

export type GetProductionCountResult = {
  rowCount: number;
  rowsPerPage: number;
};

export type GetAllProductionParams = {
  page: number;
};

export type GetAllProductionResult = Summary[];

export type GetShiftsResult = Shift[];
