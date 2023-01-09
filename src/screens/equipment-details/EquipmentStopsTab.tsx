import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import moment from 'moment/moment';

import {EquipmentStops} from '../../components/graphs/equipment-stops/Component';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import {TimelineWithReasonType} from '../../api/types/cat/production';
import {
  getEquipmentSelector,
  shiftEndTimeSelector,
  shiftStartTimeSelector,
  StopReasonTypesSelector,
} from '../../redux/site/site-selectors';
import CatStopsFilters from '../../components/stops-filters';
import {CatStopsFiltersType} from '../../components/stops-filters/types';

import {currentEquipmentObservationsSelector} from '../site-stops/selectors';

import styles from './styles';

export const EquipmentStopsTab = (props: any) => {
  const [filters, setFilters] = useState<CatStopsFiltersType>({
    infiniteOnly: false,
    noReasonOnly: false,
  });

  const shiftEndTime = useCatSelector(shiftEndTimeSelector);
  const shiftStartTime = useCatSelector(shiftStartTimeSelector);

  const title = moment(shiftStartTime).format('ddd. DD');

  const context = props.route.context;
  const equipmentSelector = getEquipmentSelector(context);
  const selectedEquipment = useCatSelector(equipmentSelector);
  const stopReasons = useCatSelector(StopReasonTypesSelector);
  const observations = useCatSelector(state =>
    currentEquipmentObservationsSelector(state, equipmentSelector),
  );

  if (!selectedEquipment) {
    return null;
  }

  const timelines: TimelineWithReasonType[] = [
    ...(selectedEquipment.maintenanceTimeline ?? []),
    ...(selectedEquipment.operationalDelayTimeline ?? []),
    ...(selectedEquipment.standbyTimeline ?? []),
  ].map(tl => ({
    ...tl,
    reasonType: stopReasons.find(rt => tl.stopReasonTypeId === rt.id),
  }));

  return (
    <View style={styles.stopsContainer}>
      <View style={styles.header}>
        <CatText variant={'headlineSmall'}>{title}</CatText>
        <CatStopsFilters
          onChange={newFilters => setFilters(newFilters)}
          initialState={filters}
        />
      </View>
      <ScrollView alwaysBounceVertical={false}>
        <EquipmentStops
          endTime={shiftEndTime}
          filters={filters}
          observations={observations}
          startTime={shiftStartTime}
          timelines={timelines}
          equipmentId={selectedEquipment.id}
        />
      </ScrollView>
    </View>
  );
};
