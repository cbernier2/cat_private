import React from 'react';
import {Line} from 'react-native-svg';

import useCatTheme from '../../../../hooks/useCatTheme';

import {NowMarkerType} from './types';

export const NowMarker: React.FC<NowMarkerType> = props => {
  const theme = useCatTheme();

  const {now, scale, x1, x2, y} = props;

  const [min, max] = scale.domain();
  const end = max.getTime();
  const start = min.getTime();

  const getY = () => y ?? scale(now);

  if (y || (start <= now && now <= end)) {
    return (
      <Line
        x1={x1}
        x2={x2}
        y={getY()}
        stroke={theme.colors.errorWarning0}
        strokeWidth={2}
      />
    );
  }

  return null;
};
