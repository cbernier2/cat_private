import React from 'react';
import {ScrollView, View} from 'react-native';
import moment from 'moment/moment';

import {EquipmentStops} from '../../components/graphs/equipment-stops/Component';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import {TimelineWithReasonType} from '../../api/types/cat/production';
import {
  currentEquipmentObservationsSelector,
  currentEquipmentSelector,
  searchEquipmentSelector,
  shiftEndTimeSelector,
  shiftStartTimeSelector,
  StopReasonTypesSelector,
} from '../../redux/site/site-selectors';

import styles from './styles';

export const EquipmentStopsTab = (props: any) => {
  const shiftEndTime = useCatSelector(shiftEndTimeSelector);
  const shiftStartTime = useCatSelector(shiftStartTimeSelector);

  const title = moment(shiftStartTime).format('ddd. DD');

  const isSearch = Boolean(props.route.isSearch);
  const equipmentSelector = isSearch
    ? searchEquipmentSelector
    : currentEquipmentSelector;
  const selectedEquipment = useCatSelector(equipmentSelector);
  const stopReasons = useCatSelector(StopReasonTypesSelector);
  const observations = useCatSelector(state =>
    currentEquipmentObservationsSelector(state, equipmentSelector),
  );
  const timelines: TimelineWithReasonType[] = [
    ...(selectedEquipment?.maintenanceTimeline ?? []),
    ...(selectedEquipment?.operationalDelayTimeline ?? []),
    ...(selectedEquipment?.standbyTimeline ?? []),
  ].map(tl => ({
    ...tl,
    reasonType: stopReasons.find(rt => tl.stopReasonTypeId === rt.id),
  }));

  return (
    <View style={styles.productionContainer}>
      <CatText variant={'headlineSmall'}>{title}</CatText>
      <ScrollView alwaysBounceVertical={false}>
        <EquipmentStops
          endTime={shiftEndTime}
          observations={observations}
          startTime={shiftStartTime}
          timelines={timelines}
        />
      </ScrollView>
    </View>
  );
};
