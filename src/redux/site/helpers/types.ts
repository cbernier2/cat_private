import {CatColumn, MaterialLegend} from '../../../api/types';
import {TimeData} from '../../../components/graphs/types';
import {UnitType} from '../../../api/types/cat/common';

export type UnitData = {
  averageHourlyValue?: number;
  hourlyValues: TimeData[];
  averageUnit: string;
  averageValue: number;
  cumulativeValues: TimeData[];
  currentHourUnit: string;
  currentHourValue: number;
  materialLegend: MaterialLegend[];
  projectedCumulativeValues: TimeData[];
  projectedUnit: string;
  projectedValue: number;
  targetUnit: string;
  targetValue: number;
  totalLoadsUnit: string;
  totalUnit: string;
  totalValue: number;
  variationUnit: string;
  variationValue: number;
  currentRateValue: number;
  currentRateUnit: string;
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
  currentRate: {
    [UnitType.MASS]: {key: 'currentMassRate', unit: 'massFlowRateUnit'},
    [UnitType.VOLUME]: {
      key: 'currentVolumeRate',
      unit: 'preferredProdVolumetricFlowRateUnit',
    },
    [UnitType.LOAD]: {key: 'currentLoadRate', unit: 'loadRateUnit'},
  },
};

export const SUMMARY_COLUMNS: {
  [column in keyof typeof summaryColumns]: {[unit in UnitType]: CatColumn};
} = summaryColumns;

export const TARGET_COLUMN: CatColumn = {key: 'target', unit: 'targetUnit'};
