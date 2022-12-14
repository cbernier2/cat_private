import {ScaleTime} from 'd3';

import {ObservationWithReasonType} from '../../../../api/types/cat/observation';
import {TimelineWithReasonType} from '../../../../api/types/cat/production';

import {MinestarIconName} from '../../../minestar-icon/types';

export interface BlocksType {
  labelWidth: number;
  now: number;
  observations: ObservationWithReasonType[];
  scale: ScaleTime<any, any>;
  timelines: TimelineWithReasonType[];
  width: number;
}

export interface Block {
  columns: number;
  conflicts: number[];
  duration: string;
  end: number;
  icons?: MinestarIconName[];
  index: number;
  isOngoing: boolean;
  label: string;
  patternId: string;
  position: number;
  start: number;
}
