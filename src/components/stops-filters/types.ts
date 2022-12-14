export type CatStopsFiltersType = {
  infiniteOnly: boolean;
  noReasonOnly: boolean;
};

export type CatStopsFiltersComponentType = {
  onChange: (filters: CatStopsFiltersType) => void;
  initialState: CatStopsFiltersType;
};
