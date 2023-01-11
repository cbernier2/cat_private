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
import {CommonConstants, UNDEFINED_VALUE} from '../../api/types/cat/common';
import {formatDuration, intervalToDuration} from 'date-fns';
import {CatTimePicker} from '../../components/pickers/time/Component';
import {TimeOption} from '../../api/types/cat/time-option';
import {formatTime} from '../../utils/format';
import moment from 'moment';
import useCatDispatch from '../../hooks/useCatDispatch';
import {ObservationType} from '../../api/types/cat/observation';
import {HelperText} from 'react-native-paper';
import {saveObservationAsyncAction} from '../../redux/site/site-slice';
import {CatError} from '../../components/error';
import {sitesSelectedSiteSelector} from '../../redux/sites-list/sites-selectors';
import {DateUtils} from '../../utils/date-utils';

export const timestampToString = (timestamp: number | undefined) =>
  timestamp
    ? timestamp === DateUtils.MAX_TIMESTAMP_VALUE
      ? '∞'
      : formatTime(moment(timestamp))
    : UNDEFINED_VALUE;

const timestampToTimeOption = (timestamp: number | undefined) =>
  timestamp
    ? timestamp === DateUtils.MAX_TIMESTAMP_VALUE
      ? TimeOption.ON_GOING
      : TimeOption.CUSTOM
    : undefined;

const AddEditObservationScreen: React.FC<AddEditObservationScreenType> = ({
  route,
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const storeData = useCatSelector(state =>
    addEditObservationSelector(state, route.params ?? {}),
  );
  const selectedSite = useCatSelector(sitesSelectedSiteSelector);
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
  >(timestampToTimeOption(storeData?.observation?.startTime));
  const [endTimeOption, _setEndTimeOption] = useState<TimeOption | undefined>(
    timestampToTimeOption(storeData?.observation?.endTime),
  );
  const [description, setDescription] = useState(
    storeData?.observation?.description,
  );
  const [savePressed, setSavePressed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [serverError, setServerError] = useState<string>();

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
  const startTimeStr = timestampToString(startTime);
  const endTimeStr = timestampToString(endTime);
  const durationStr =
    startTime && endTime
      ? endTime !== DateUtils.MAX_TIMESTAMP_VALUE
        ? formatDuration(intervalToDuration({start: startTime, end: endTime}), {
            format: ['hours', 'minutes'],
          })
        : '∞'
      : UNDEFINED_VALUE;

  const saveObservation = async () => {
    setSavePressed(true);

    if (!stopReason || !startTime || !endTime || startTime >= endTime) {
      return;
    }

    setIsSaving(true);
    const result = await dispatch(
      saveObservationAsyncAction({
        id: observation?.id ?? UUID(),
        observedEquipmentId: equipmentSummary
          ? equipmentSummary.equipment?.id ?? ''
          : CommonConstants.UNDEFINED_UUID,
        lastUpdateTime: moment().valueOf(),
        observationType: ObservationType.STOP_REASON_TYPE,
        observedValueId: stopReason,
        startTime,
        endTime,
        description,
      }),
    );
    if (result.payload) {
      setServerError(t('cat.message_server_error'));
    } else {
      setServerError(undefined);
    }
    setIsSaving(false);

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
            {equipmentSummary ? (
              <>
                <CatEquipmentIcon
                  equipmentSummary={equipmentSummary}
                  type={equipmentSummary.type}
                />
                <CatSpacer width={8} />
                <CatText>{equipmentSummary.equipment?.name}</CatText>
              </>
            ) : (
              <CatText>{selectedSite?.siteName}</CatText>
            )}
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
            inputProps={{
              errorMessage:
                savePressed && !startTime
                  ? t('start_time_required')
                  : undefined,
            }}
          />
        </View>
        <CatSpacer />
        <View style={styles.timePicker}>
          <CatDropDown
            value={endTimeOption}
            setValue={value => setEndTimeOption(value)}
            list={endTimeOptions}
            label={t('cat.end_time')}
            inputProps={{
              errorMessage:
                savePressed && !endTime ? t('end_time_required') : undefined,
            }}
          />
        </View>
      </View>
      {savePressed && startTime && endTime && startTime >= endTime && (
        <HelperText type="error">
          {t('observation_error_start_before_end')}
        </HelperText>
      )}
      <CatSpacer />
      <CatDropDown
        value={stopReason}
        setValue={value => setStopReason(value)}
        list={stopReasons}
        label={t('cat.stop_reason')}
        inputProps={{
          errorMessage:
            savePressed && !stopReason
              ? t('cat.stop_reason_required')
              : undefined,
        }}
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
      <CatError message={serverError} />
      <CatButton onPress={saveObservation} loading={isSaving}>
        {isEditing ? t('save_observation') : t('cat.add_observation')}
      </CatButton>
    </CatScreen>
  );
};

export default AddEditObservationScreen;
