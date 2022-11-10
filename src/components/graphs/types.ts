/**
 * Interface sourced from
 * https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/components/charts/time-data.ts
 *
 * This class represents a single data item at a point in time
 */
export interface TimeData {
  time: number; // time in ms, for x-axis
  value: any; // 1st value for y-axis
  value2?: any; // 2nd value for y-axis (used for stacked charts)
  iconName?: string;
  materialIcon?: boolean;
}
