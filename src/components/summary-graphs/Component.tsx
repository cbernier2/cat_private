import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

import useCatSelector from '../../hooks/useCatSelector';
import {
  shiftEndTimeSelector,
  shiftStartTimeSelector,
} from '../../redux/site/site-selectors';

import {BarChart} from '../graphs/bar-chart/Component';
import {LineChart} from '../graphs/line-chart/Component';

import {GraphType, SummaryGraphsType} from './types';

export const SummaryGraphs: React.FC<SummaryGraphsType> = props => {
  const {defaultView = 'line', summary} = props;

  const [view, setView] = useState<GraphType>(defaultView);
  const shiftEndTime = useCatSelector(shiftEndTimeSelector);
  const shiftStartTime = useCatSelector(shiftStartTimeSelector);

  const isView = (t: GraphType) => t === view;
  const toggleView = () => setView(isView('line') ? 'bar' : 'line');

  return (
    <TouchableWithoutFeedback onPress={toggleView}>
      <View>
        <LineChart
          endTime={shiftEndTime}
          materialLegend={summary.materialLegend}
          materialTime={summary.materialTimeSeries}
          maxThreshold={summary.cumulativeTargetMaxThreshold}
          minThreshold={summary.cumulativeTargetMinThreshold}
          projected={summary.projectedCumulativeValues}
          showIf={isView('line')}
          startTime={shiftStartTime}
          target={summary.cumulativeTarget}
          values={summary.cumulativeValues}
        />
        <BarChart showIf={isView('bar')} />
      </View>
    </TouchableWithoutFeedback>
  );
};
