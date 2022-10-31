import {units} from 'minestar-units';

import {UnitType} from '../../constants/common';

export interface Material {
  id: string;
  name?: string;
  description?: string;

  looseDensity?: units.Quantity; // the loose material density
  bankDensity?: units.Quantity; // the bank material density

  color: string; // the hex value for the background color
  pattern: string; // the name of the pattern to use
  patternColor: string; // the foreground color / color of the stroke to use in the pattern

  preferredMeasurementBasis?: UnitType; // the preferred way to measure this material for production
}
