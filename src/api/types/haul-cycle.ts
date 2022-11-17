export interface CatHaulCycle {
  id: string;
  shift: string;
  loadEquipment: string;
  haulEquipment: string;
  loadStartTime: number;
  loadCompletedTime: number;
  loadingTime: number;
  loadPosition: string;
  sourceArea: string;
  dumpStartTime: number;
  dumpCompletedTime: number;
  dumpPosition: string;
  destinationArea: string;
  material: string;
  massValue: number;
  massUnit: string;
  volumeValue: number;
  volumeUnit: string;
  simplifiedPath: string;
  loadHaulDumpCycle?: boolean;
  flagged: boolean;
}
