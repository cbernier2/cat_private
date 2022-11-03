import {SummaryCell} from './types';
import {UnitType} from '../../api/types/cat/common';

export const summaryCells: {[key: string]: {[key in UnitType]: SummaryCell}} = {
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
};
