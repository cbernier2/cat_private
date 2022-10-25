export type EquipmentType = 'Dozer' | 'LightVehicle' | 'Scraper';

export interface IEquipment {
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  deleted: boolean;
  length: number;
  subscriptions: string[]; // TODO define properly
  type: EquipmentType;
  configurationReceived: boolean;
  instrumented: boolean;
}
