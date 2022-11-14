import {TimeData} from '../../../components/graphs/types';
import {UnitType} from '../../../api/types/cat/common';
import {CatColumn} from '../../../api/types';

export type UnitData = {
  cumulativeValues: TimeData[];
  projectedCumulativeValues: TimeData[];
  totalValue: number;
  totalUnit: string;
  averageValue: number;
  averageUnit: string;
  projectedValue: number;
  projectedUnit: string;
  currentHourValue: number;
  currentHourUnit: string;
  variationValue: number;
  variationUnit: string;
  targetValue: number;
  targetUnit: string;
  totalLoadsUnit: string;
};

// Base on Cat's web app: src/common/pages/site-board/bottom-panel/bottom-panel-summary-abstract.card.ts
const summaryColumns = {
  total: {
    [UnitType.MASS]: {key: 'totalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {key: 'totalVolume', unit: 'preferredProdVolumeUnit'},
    [UnitType.LOAD]: {key: 'totalLoads', unit: 'loadUnit'},
  },
  average: {
    [UnitType.MASS]: {key: 'averageMassRate', unit: 'massFlowRateUnit'},
    [UnitType.VOLUME]: {
      key: 'averageVolumeRate',
      unit: 'preferredProdVolumetricFlowRateUnit',
    },
    [UnitType.LOAD]: {key: 'averageLoadRate', unit: 'loadRateUnit'},
  },
  projected: {
    [UnitType.MASS]: {key: 'projectedTotalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'projectedTotalVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'projectedTotalLoads', unit: 'loadUnit'},
  },
  currentHour: {
    [UnitType.MASS]: {key: 'currentHourMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'currentHourVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'currentHourLoads', unit: 'loadUnit'},
  },
  variation: {
    [UnitType.MASS]: {key: 'variationMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {
      key: 'variationVolume',
      unit: 'preferredProdVolumeUnit',
    },
    [UnitType.LOAD]: {key: 'variationLoads', unit: 'loadUnit'},
  },
  shiftToDate: {
    [UnitType.MASS]: {key: 'totalMass', unit: 'massUnit'},
    [UnitType.VOLUME]: {key: 'totalVolume', unit: 'preferredProdVolumeUnit'},
    [UnitType.LOAD]: {key: 'totalLoads', unit: 'loadUnit'},
  },
};

export const SUMMARY_COLUMNS: {
  [column in keyof typeof summaryColumns]: {[unit in UnitType]: CatColumn};
} = summaryColumns;

export const TARGET_COLUMN: CatColumn = {key: 'target', unit: 'targetUnit'};
