import React, {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';
import CatButton from '../../components/button';
import CatText from '../../components/text';
import CatStopsFilters from '../../components/stops-filters';
import {CatStopsFiltersType} from '../../components/stops-filters/types';
import {SiteStopsChart} from '../../components/graphs/site-stops/Component';
import {currentShiftLabelSelector} from '../../redux/site/site-selectors';
import {ArrayUtils} from '../../utils/array-utils';
import {EquipmentList} from '../../components/graphs/site-stops/equipmentList/Component';
import {CatError} from '../../components/error';

import {
  equipmentObservationsSelector,
  siteEquipmentsObservationsSelector,
  siteObservationsSelector,
} from './selectors';
import {ScreenType} from './types';
import {useStyles} from './styles';
import useCatStore from '../../hooks/useCatStore';
import {CatSelectListItems} from '../../components/select-list/types';
import {CatSelectList} from '../../components/select-list/Component';
import {timestampToString} from '../add-edit-observation/Screen';

const SiteStopsScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const store = useCatStore();
  const styles = useStyles();
  const [filters, setFilters] = useState<CatStopsFiltersType>({
    infiniteOnly: false,
    noReasonOnly: false,
  });
  const [
    currentObservationListEquipmentId,
    setCurrentObservationListEquipmentId,
  ] = useState<string | null | undefined>();

  const currentShift = useSelector(currentShiftLabelSelector);
  const siteStops = useSelector(siteObservationsSelector);
  const equipments = useSelector(siteEquipmentsObservationsSelector);
  // If the SVG becomes too long it makes the app crash...
  //  Split list into smaller chunks to render multiple SVGs instead
  const equipmentsGroups = ArrayUtils.splitArray(equipments, 10);

  const data = currentShift && equipments.length > 0;

  const addObservation = () => {
    navigation.navigate('AddEditObservation');
  };

  const currentEquipmentObservations = useMemo((): CatSelectListItems => {
    if (currentObservationListEquipmentId === undefined) {
      return [];
    }
    const state = store.getState();
    const stopReasonTypes = state.site.stopReasonTypes;
    const observations = equipmentObservationsSelector(
      state,
      currentObservationListEquipmentId,
    );
    return observations.map(observation => ({
      value: observation.id,
      label: (
        <View style={styles.observationListItem}>
          <CatText variant="titleMedium">
            {
              stopReasonTypes.find(
                stopReason => stopReason.id === observation.observedValueId,
              )?.name
            }
          </CatText>
          <CatText
            variant="labelLarge"
            style={styles.observationListItemTimeText}>
            {timestampToString(observation.startTime)} -{' '}
            {timestampToString(observation.endTime)}
          </CatText>
        </View>
      ),
    }));
  }, [currentObservationListEquipmentId, store, styles]);

  const addEditObservation = (observationId: string | null) => {
    if (currentObservationListEquipmentId !== undefined) {
      navigation.navigate({
        name: 'AddEditObservation',
        params: {
          equipmentId:
            currentObservationListEquipmentId !== null
              ? currentObservationListEquipmentId
              : undefined,
          observationId: observationId ?? undefined,
        },
      });
      setCurrentObservationListEquipmentId(undefined);
    }
  };

  return (
    <CatScreen scroll={false} title={t('cat.site_stops')}>
      <View style={styles.headerContainer}>
        <CatText variant={'headlineSmall'}>
          {currentShift ?? t('no_shifts')}
        </CatText>
      </View>
      {equipments.length === 0 && (
        <View style={styles.noDataContainer}>
          <CatError message={t('cat.message_no_data_available')} />
        </View>
      )}
      {data && (
        <>
          <View style={styles.headerContainer}>
            <CatButton
              onPress={addObservation}
              labelStyle={styles.addButtonLabel}
              style={styles.addButton}>
              {'+'}
            </CatButton>
            <View style={styles.filterButtonsContainer}>
              <CatStopsFilters
                onChange={newFilters => setFilters(newFilters)}
                initialState={filters}
              />
            </View>
          </View>
          <ScrollView>
            <View style={styles.verticalScrollWrapper}>
              <View>
                {equipmentsGroups.map((group, i) => (
                  <EquipmentList
                    key={`l${i}`}
                    equipments={group}
                    withSiteStopsRow={i === 0}
                  />
                ))}
              </View>
              <ScrollView horizontal>
                <View>
                  {equipmentsGroups.map((group, i) => (
                    <SiteStopsChart
                      key={`c${i}`}
                      onSelect={() =>
                        setCurrentObservationListEquipmentId(null)
                      }
                      equipments={group}
                      filters={filters}
                      siteStops={siteStops}
                      withSiteStopsRow={i === 0}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
      <CatSelectList
        visible={currentObservationListEquipmentId !== undefined}
        title={t('select_observation_title')}
        list={[
          ...currentEquipmentObservations,
          {
            label: (
              <View style={styles.observationListAdd}>
                <CatText
                  style={styles.observationListAddText}
                  variant="titleMedium">
                  {t('cat.add_observation').toUpperCase()}
                </CatText>
              </View>
            ),
            value: null,
          },
        ]}
        setValue={addEditObservation}
        onDismiss={() => setCurrentObservationListEquipmentId(undefined)}
      />
    </CatScreen>
  );
};

export default SiteStopsScreen;
