import {Summary} from './production';
import {Shift} from './shift';

export type GetProductionCountResult = {
  rowCount: number;
  rowsPerPage: number;
};

export type GetAllProductionParams = {
  page: number;
};

export type GetAllProductionResult = Summary[];

export type GetShiftsResult = Shift[];
