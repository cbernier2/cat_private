import {Summary} from './production';

export type GetProductionCountResult = {
  rowCount: number;
  rowsPerPage: number;
};

export type GetAllProductionParams = {
  page: number;
};

export type GetAllProductionResult = Summary[];
