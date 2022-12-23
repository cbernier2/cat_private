import React, {useEffect, useState} from 'react';
import {v4 as UUID} from 'uuid';
import {useTranslation} from 'react-i18next';
import CatScreen from '../../components/screen';

import styles from './styles';
import {AddEditObservationScreenType} from './types';
import {View} from 'react-native';
import CatButton from '../../components/button';
import CatTextInput from '../../components/text-input';
import CatDropDown from '../../components/drop-down';
import {addEditObservationSelector, getTimeOptionValue} from './selectors';
import useCatSelector from '../../hooks/useCatSelector';
import CatSpacer from '../../components/spacer';
import CatText from '../../components/text';
import CatCard from '../../components/card';
import {CatEquipmentIcon} from '../../components/equipment-icon';
import CatTextWithLabel from '../../components/text-with-label';
import {UNDEFINED_VALUE} from '../../api/types/cat/common';
import {formatDuration, intervalToDuration} from 'date-fns';
import {CatTimePicker} from '../../components/pickers/time/Component';
import {TimeOption} from '../../api/types/cat/time-option';
import {formatTime} from '../../utils/format';
import moment from 'moment';
import {catApi} from '../../redux/site/api';
import useCatDispatch from '../../hooks/useCatDispatch';

const AddEditObservationScreen: React.FC<AddEditObservationScreenType> = ({
  route,
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const storeData = useCatSelector(state =>
    addEditObservationSelector(state, route.params ?? {}),
  );
  const [stopReason, setStopReason] = useState<string | undefined>(
    storeData?.observation?.observedValueId,
  );
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [customStartTime, setCustomStartTime] = useState(
    storeData?.observation?.startTime,
  );
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [customEndTime, setCustomEndTime] = useState(
    storeData?.observation?.endTime,
  );
  const [startTimeOption, _setStartTimeOption] = useState<
    TimeOption | undefined
  >(storeData?.observation?.startTime ? TimeOption.CUSTOM : undefined);
  const [endTimeOption, _setEndTimeOption] = useState<TimeOption | undefined>(
    storeData?.observation?.endTime ? TimeOption.CUSTOM : undefined,
  );
  const [description, setDescription] = useState(
    storeData?.observation?.description,
  );

  const setStartTimeOption = (newValue: TimeOption) => {
    _setStartTimeOption(newValue);
    if (newValue === TimeOption.CUSTOM) {
      setStartTimePickerVisible(true);
    }
  };
  const setEndTimeOption = (newValue: TimeOption) => {
    _setEndTimeOption(newValue);
    if (newValue === TimeOption.CUSTOM) {
      setEndTimePickerVisible(true);
    }
  };

  useEffect(() => {
    if (!storeData) {
      navigation.goBack();
    }
  }, [storeData, navigation]);

  if (!storeData) {
    return null;
  }

  const {
    currentShift,
    equipmentSummary,
    observation,
    observations,
    stopReasons,
    startTimeOptions,
    endTimeOptions,
  } = storeData ?? {};
  const isEditing = observation !== undefined;

  const stopReasonPreview =
    stopReasons?.find(it => it.value === stopReason)?.label ?? UNDEFINED_VALUE;
  const startTime =
    startTimeOption &&
    getTimeOptionValue(
      currentShift,
      startTimeOption,
      customStartTime,
      observation,
      observations,
    );
  const endTime =
    endTimeOption &&
    getTimeOptionValue(
      currentShift,
      endTimeOption,
      customEndTime,
      observation,
      observations,
    );
  const startTimeStr = startTime
    ? formatTime(moment(startTime))
    : UNDEFINED_VALUE;
  const endTimeStr = endTime ? formatTime(moment(endTime)) : UNDEFINED_VALUE;
  const durationStr =
    startTime && endTime
      ? formatDuration(intervalToDuration({start: startTime, end: endTime}), {
          format: ['hours', 'minutes'],
        })
      : UNDEFINED_VALUE;

  const saveObservation = async () => {
    dispatch(
      catApi.endpoints.saveObservation.initiate({
        id: observation?.id ?? UUID(),
        startTime,
        endTime,
        observedValueId: stopReason,
        description,
      }),
    );
    navigation.goBack();
  };

  return (
    <CatScreen
      style={styles.container}
      title={isEditing ? t('edit_observation') : t('cat.add_observation')}>
      <CatTimePicker
        hours={
          startTimePickerVisible
            ? moment(customStartTime).hours()
            : moment(customEndTime).hours()
        }
        minutes={
          startTimePickerVisible
            ? moment(customStartTime).minutes()
            : moment(customEndTime).minutes()
        }
        visible={startTimePickerVisible || endTimePickerVisible}
        onDismiss={() => {
          setStartTimePickerVisible(false);
          setEndTimePickerVisible(false);
        }}
        onConfirm={newTimeObj => {
          const newTime = moment().startOf('day').add(newTimeObj);
          if (startTimePickerVisible) {
            setCustomStartTime(newTime.valueOf());
          } else if (endTimePickerVisible) {
            setCustomEndTime(newTime.valueOf());
          }
        }}
      />
      <CatSpacer />
      <CatCard>
        <CatText>{stopReasonPreview}</CatText>
        <CatSpacer />
        <View style={styles.previewRow2}>
          <View style={styles.equipmentName}>
            <CatEquipmentIcon
              equipmentSummary={equipmentSummary}
              type={equipmentSummary.type}
            />
            <CatSpacer width={8} />
            <CatText>{equipmentSummary.equipment?.name}</CatText>
          </View>
          <CatTextWithLabel label={`${startTimeStr} - ${endTimeStr}`}>
            {durationStr}
          </CatTextWithLabel>
        </View>
      </CatCard>
      <CatSpacer />
      <View style={styles.timePickers}>
        <View style={styles.timePicker}>
          <CatDropDown
            value={startTimeOption}
            setValue={value => setStartTimeOption(value)}
            list={startTimeOptions}
            label={t('cat.start_time')}
          />
        </View>
        <CatSpacer />
        <View style={styles.timePicker}>
          <CatDropDown
            value={endTimeOption}
            setValue={value => setEndTimeOption(value)}
            list={endTimeOptions}
            label={t('cat.end_time')}
          />
        </View>
      </View>
      <CatSpacer />
      <CatDropDown
        value={stopReason}
        setValue={value => setStopReason(value)}
        list={stopReasons}
        label={t('cat.stop_reason')}
      />
      <CatSpacer />
      <CatTextInput
        style={styles.descriptionInput}
        multiline={true}
        label={t('cat.variation_description')}
        value={description}
        onChangeText={newDescription => setDescription(newDescription)}
      />
      <CatSpacer />
      <CatButton
        onPress={saveObservation}
        disabled={!startTime || !endTime || !stopReason}>
        {isEditing ? t('save_observation') : t('cat.add_observation')}
      </CatButton>
    </CatScreen>
  );
};

export default AddEditObservationScreen;
