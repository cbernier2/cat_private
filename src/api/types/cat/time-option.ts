/**
 * Sourced from https://gitgis.ecorp.cat.com/minestar/pitsupervisor/minestar-core/-/blob/develop/app-web/src/common/pages/production-manage/time-option.ts
 * Edited for lint/prettier fixes and imports
 */

export enum TimeOption {
  NOW = 'now',
  START_OF_SHIFT = 'start_of_shift',
  END_OF_SHIFT = 'end_of_shift',
  SNAP_TO_PREVIOUS = 'snap_to_previous',
  SNAP_TO_NEXT = 'snap_to_next',
  THIRTY_MIN_AGO = '30_ago',
  ONE_HOUR_AGO = '1_ago',
  CUSTOM = 'custom',
  ON_GOING = 'on_going',
}
