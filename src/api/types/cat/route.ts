// Copy from Caterpillar Web App: src/common/providers/route/route.ts

import {PlanArea} from './plan-area';
import {Equipment} from './equipment';

export interface Route {
  readonly name: string;
  sourceArea?: PlanArea;
  loadEquipment?: Equipment;
  destinationArea?: PlanArea;
}

export interface RouteVisualization {
  route: Route;
  geometry: string[];
  paths: string[];
  name: string;
}
