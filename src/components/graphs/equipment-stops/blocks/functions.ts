import moment from 'moment';

import {TimelineWithReasonType} from '../../../../api/types/cat/production';
import {ObservationWithReasonType} from '../../../../api/types/cat/observation';
import {StopReasonTypeUtils} from '../../../../api/types/cat/stop-reason';
import {DateUtils} from '../../../../utils/date-utils';

import {CatStopsFiltersType} from '../../../stops-filters/types';
import {MinestarIconName} from '../../../minestar-icon/types';

import {StopReasonPatterns} from '../../pattern/stop-patterns';
import {getPatternId} from '../../pattern/functions';

import {Block} from './types';

export const assignColumns = (acc: Block[], a: Block, i: number): Block[] => {
  let position = 0;
  // Get prior block conflicts
  const priorConflicts = a.conflicts.slice(0, a.conflicts.indexOf(i));
  if (priorConflicts.length) {
    position = computeColumnFromConflicts(i, acc, priorConflicts);
  }
  acc.push({...a, position});
  return acc;
};

const computeColumnFromConflicts = (
  index: number,
  blocks: Block[],
  priorConflicts: number[],
): number => {
  // Assume there's no space available on the left
  let position = priorConflicts.length;
  // Then loop to check
  priorConflicts.every((cId, i) => {
    const positionChecked = blocks[cId].position;

    if (positionChecked > 0) {
      const priorIndex = blocks[cId].conflicts.indexOf(cId);
      const priorPriorConflicts = blocks[cId].conflicts.slice(0, priorIndex);
      const shared = priorConflicts.filter(r =>
        priorPriorConflicts.includes(r),
      );

      if (shared.length === 0) {
        // None of the prior conflict's prior conflicts are shared
        //  Fit right under it/them?
        position = 0;

        // But first check that we haven't already set an in-between conflict to 0+
        const otherPositions = priorConflicts
          .filter((c, j) => j > i)
          .map(id => blocks[id].position)
          .filter(p => p < positionChecked);

        if (otherPositions.length) {
          position = Math.max(...otherPositions) + 1;
        }

        // If we somehow end up with a position equal or higher
        //  to the one we are currently checking against, dig deeper
        if (position >= positionChecked) {
          position = computeColumnFromConflicts(index, blocks, shared);
        }
        return false;
      } else if (shared.length < priorPriorConflicts.length) {
        // Should be some space left, checking between shared conflicts
        //  If we haven't already looped around
        const otherPositions = priorPriorConflicts
          .filter((c, j) => j < i)
          .map(id => blocks[id].position)
          .filter(p => p >= positionChecked);

        // In which case, continue as normal
        if (otherPositions.length) {
          return true;
        }

        position = computeColumnFromConflicts(index, blocks, shared);
        return false;
      }
    } // else, no space before this one, continue loop
    return true;
  });

  return position;
};

export const countColumns = (
  block: Block,
  _: number,
  blocks: Block[],
): Block => {
  const positions = blocks
    .filter(t => block.conflicts.includes(t.index))
    .flatMap(l => l.position);
  // TODO Also compare with current totals? Include column span?
  //  Right now it can look a bit funky in some niche cases but it's working.
  return {...block, columns: Math.max(...positions) + 1};
};

export const filterBlock = (block: Block, filters: CatStopsFiltersType) => {
  return (
    (!filters.infiniteOnly && !filters.noReasonOnly) ||
    (filters.infiniteOnly && block.isOngoing) ||
    (filters.noReasonOnly && block.noReason)
  );
};

export const findConflicts = (a: Block, _: number, blocks: Block[]): Block => ({
  ...a,
  conflicts: blocks
    .filter(b => a.end > b.start && a.start < b.end)
    .map(tl => tl.index),
});

export const getEndTime = (
  entry: ObservationWithReasonType | TimelineWithReasonType,
  now: number,
) => {
  const minimumDuration = 15;
  const duration = moment
    .duration(moment(entry.endTime).diff(moment(entry.startTime)))
    .asMinutes();

  return duration < minimumDuration
    ? moment(entry.startTime).add(minimumDuration, 'minutes').valueOf()
    : Math.min(entry.endTime, now);
};

export const toBlockData = (
  entry: ObservationWithReasonType | TimelineWithReasonType,
  prefix: 'OB' | 'TL',
  translations: any,
  now: number,
): Block => {
  const isOngoing = entry.endTime === DateUtils.MAX_TIMESTAMP_VALUE;
  const duration = isOngoing
    ? '∞'
    : DateUtils.formatDuration(entry.endTime - entry.startTime);

  let icons: MinestarIconName[] = [];
  let label = translations.no_reason;
  let pattern;
  let noReason: boolean = false;

  if (entry.reasonType) {
    icons.push(entry.reasonType.iconName as MinestarIconName);
    pattern = StopReasonPatterns.get(
      `${prefix}_${entry.reasonType.classification}`,
    );
    const stopReason = StopReasonTypeUtils.decorateTranslation(
      entry.reasonType,
      translations,
    );
    if (stopReason) {
      label = StopReasonTypeUtils.getResolvedStopReasonName(stopReason);
    }
  } else {
    pattern = StopReasonPatterns.get('UNKNOWN');
    icons.push('stop_reason_unknown');
    noReason = true;
  }

  if (
    'fuelingOccurred' in entry &&
    entry.fuelingOccurred &&
    !icons.includes('stop_reason_fueling')
  ) {
    icons.push('stop_reason_fueled');
  }

  return {
    columns: 1,
    conflicts: [],
    duration,
    end: getEndTime(entry, now),
    icons,
    index: -1,
    isOngoing,
    label,
    noReason,
    patternId: getPatternId(
      pattern?.background,
      pattern?.pattern,
      pattern?.foreground,
    ),
    position: 0,
    start: entry.startTime,
  };
};
