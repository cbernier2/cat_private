import React, {useMemo} from 'react';
import {Defs, G} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

import {getPatternFromId} from '../../pattern/functions';
import {Pattern} from '../../pattern/Component';

import {Block as CatBlock} from '../block/Component';

import {Block, BlocksType} from './types';
import {
  assignColumns,
  countColumns,
  filterBlock,
  findConflicts,
  toBlockData,
} from './functions';

export const Blocks = (props: BlocksType) => {
  const {filters, labelWidth, now, observations, timelines, scale, width} =
    props;
  const {i18n} = useTranslation();

  const boxPadding = 5;

  const {blocks, patterns} = useMemo((): {
    blocks: Block[];
    patterns: string[];
  } => {
    const catTranslations = i18n.getDataByLanguage(i18n.resolvedLanguage)
      ?.translation.cat;

    const tls: Block[] = timelines.map(tl =>
      toBlockData(tl, 'TL', catTranslations, now),
    );
    const obs: Block[] = observations.map(ob =>
      toBlockData(ob, 'OB', catTranslations, now),
    );

    // Filter and sort list, also save index for easier looping later
    const entries = [...tls, ...obs]
      .filter(tl => filterBlock(tl, filters))
      .sort((a, b) => a.start - b.start)
      .map((tl, index) => ({...tl, index}))
      .map(findConflicts)
      // Find the (column) position of each block, based on their conflicts
      .reduce(assignColumns, [])
      // With positions assigned we know how many columns to render
      .map(countColumns);

    return {
      blocks: entries,
      patterns: Array.from(new Set(entries.flatMap(e => e.patternId))),
    };
  }, [filters, i18n, now, observations, timelines]);

  const drawBlock = (block: Block) => {
    const cWidth = (width - labelWidth - boxPadding) / block.columns;
    const x1 = labelWidth + boxPadding + cWidth * block.position;
    const x2 = x1 + cWidth - boxPadding;

    const y1 = scale(block.start);
    const y2 = scale(block.end);

    const height = y2 - y1;
    const blockPadding = 5;

    const points = `${x1},${y2} ${x2},${y2} ${x2},${y1} ${x1},${y1}`;
    const maskPoints =
      `${x1},${y2} ${x2 - blockPadding},${y2} ` +
      `${x2 - blockPadding},${y1} ${x1},${y1}`;

    return (
      <CatBlock
        block={block}
        blockPadding={blockPadding}
        height={height}
        maskPoints={maskPoints}
        points={points}
        scale={scale}
        x1={x1}
        x2={x2}
      />
    );
  };

  return (
    <>
      <Defs>
        {patterns.map(patternId => (
          <Pattern key={patternId} {...getPatternFromId(patternId)} />
        ))}
      </Defs>
      {blocks.map((block, i) => (
        <G key={`b${i}`}>{drawBlock(block)}</G>
      ))}
    </>
  );
};
