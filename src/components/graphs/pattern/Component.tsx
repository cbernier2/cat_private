import React from 'react';

import {Circles} from './components/Circles';
import {Flat} from './components/Flat';
import {Lines} from './components/Lines';
import {Paths} from './components/Paths';

import {getPatternId} from './functions';
import {patterns} from './patterns';
import {PatternType} from './types';

export const Pattern: React.FC<PatternType> = props => {
  const {background, foreground, pattern: patternId = 'none'} = props;

  const id = getPatternId(background, patternId, foreground);
  const pattern = patterns[patternId];

  if (pattern) {
    pattern.id(id);
    pattern.background(background);
    pattern.stroke(foreground);
    if (pattern.fill) {
      pattern.fill(foreground);
    }

    const {name, ...params} = pattern.serialize();
    switch (name) {
      case 'circles':
        return <Circles {...params} />;
      case 'lines':
        return <Lines {...params} />;
      case 'paths':
        return <Paths {...params} />;
    }
  }

  return <Flat id={id} fill={background} />;
};
