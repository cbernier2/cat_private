export type CatQueryFnParams = {
  method: string;
  path: string;
  queryParams?: Record<string, any>;
};

export type GetCountResult = {
  rowCount: number;
  rowsPerPage: number;
};
