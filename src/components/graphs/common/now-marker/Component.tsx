import React from 'react';
import {Line} from 'react-native-svg';

import useCatTheme from '../../../../hooks/useCatTheme';

import {NowMarkerType} from './types';

export const NowMarker: React.FC<NowMarkerType> = props => {
  const theme = useCatTheme();

  const {now, x, x_scale, y1, y2, y_scale} = props;

  const [x_min, x_max] = x_scale.domain();
  const end = x_max.getTime();
  const start = x_min.getTime();

  const [y_min, y_max] = y_scale?.domain() ?? [];

  const getX = () => x ?? x_scale(now);
  const getY1 = () => y1 ?? (y_scale ? y_scale(y_max) : 0);
  const getY2 = () => y2 ?? (y_scale ? y_scale(y_min) : 0);

  if (x || (start <= now && now <= end)) {
    return (
      <Line
        x={getX()}
        y1={getY1()}
        y2={getY2()}
        stroke={theme.colors.errorWarning0}
        strokeWidth={2}
      />
    );
  }

  return null;
};
