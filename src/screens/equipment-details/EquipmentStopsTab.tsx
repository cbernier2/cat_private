import React from 'react';
import {ScrollView, View} from 'react-native';
import moment from 'moment/moment';

import {EquipmentStops} from '../../components/graphs/equipment-stops/Component';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import {
  shiftEndTimeSelector,
  shiftStartTimeSelector,
} from '../../redux/site/site-selectors';

import styles from './styles';

export const EquipmentStopsTab = () => {
  const shiftEndTime = useCatSelector(shiftEndTimeSelector);
  const shiftStartTime = useCatSelector(shiftStartTimeSelector);

  const title = moment(shiftStartTime).format('ddd. DD');

  return (
    <View style={styles.productionContainer}>
      <CatText variant={'headlineSmall'}>{title}</CatText>
      <ScrollView alwaysBounceVertical={false}>
        <EquipmentStops endTime={shiftEndTime} startTime={shiftStartTime} />
      </ScrollView>
    </View>
  );
};
