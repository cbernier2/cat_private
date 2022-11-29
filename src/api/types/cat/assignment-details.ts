/**
 * Interface sourced from
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/providers/operation/assignment-details.ts
 */

export interface AssignmentDetails {
  [id: string]: string | number;
  startTime: number;
  endTime: number;
}

export interface OperatorAssignmentDetails extends AssignmentDetails {
  equipmentId: string;
  startTime: number;
  endTime: number;
  // @ts-ignore
  loginTime?: number;
  // @ts-ignore
  logoutTime?: number;
}

export interface EquipmentAssignmentDetails extends AssignmentDetails {
  operatorId: string;
  startTime: number;
  endTime: number;
}
