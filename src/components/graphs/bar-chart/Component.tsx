import React from 'react';

import CatText from '../../text';

import {BarChartType} from './types';

export const BarChart: React.FC<BarChartType> = props => {
  if (props.showIf === false) {
    return null;
  }

  return <CatText>BAR CHART</CatText>;
};
