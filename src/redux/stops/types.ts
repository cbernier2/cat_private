export interface IStop {
  id: string;
  deleted: boolean;
  lastUpdateTime: number;
  stopReasonId: number;
  stoppedEquipmentId: string;
  stoppedPlanAreaId: string;
  startTime: number;
  endTime: number;

  // Temporary attributes while we figure the actual conditions
  top: boolean;
  thin: boolean;
}
