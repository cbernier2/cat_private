import React from 'react';
import {ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import useCatSelector from '../../hooks/useCatSelector';
import {
  offlineQueueTest,
  offlineCancelTest,
  toggleOffline,
  toggleTheme,
} from '../../redux/app/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {emulateOfflineSelector} from '../../redux/app/app-selectors';
import {selectSiteAsyncAction} from '../../redux/sites-list/sites-slice';
import {
  actions as siteActions,
  fetchShiftDataAsyncAction,
} from '../../redux/site/site-slice';

import {DebugScreenType} from './types';

const DebugScreen: React.FC<DebugScreenType> = props => {
  const dispatch = useCatDispatch();
  const actionQueue = useCatSelector(state => state.network.actionQueue);
  const {t} = useTranslation();
  const isThemeDark = useCatSelector(state => state.app.isThemeDark);
  const currentShift = useCatSelector(state => state.site.currentShift);
  const latestShifts = useCatSelector(state => state.site.latestShifts);

  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);

  const cancel = async () => {
    await dispatch(offlineCancelTest());
  };

  const queue = async () => {
    await dispatch(offlineQueueTest());
  };

  const clearSiteSelection = async () => {
    await dispatch(selectSiteAsyncAction(null));
    props.navigation.popToTop();
  };

  const changeShift = (shiftId: string) => {
    const shift = latestShifts?.find(s => s.id === shiftId)!;
    dispatch(siteActions.selectShift(shift));
    dispatch(fetchShiftDataAsyncAction());
  };

  console.log(JSON.stringify(actionQueue));

  return (
    <CatScreen>
      <ScrollView>
        <CatButton onPress={() => dispatch(toggleOffline())}>
          Emulate offline ({isEmulatingOffline ? 'On' : 'Off'})
        </CatButton>
        <CatButton onPress={queue}>Queue a thing</CatButton>
        <CatButton onPress={cancel}>Cancel queue</CatButton>

        <CatText>{JSON.stringify(actionQueue)}</CatText>

        <CatButton onPress={() => dispatch(toggleTheme())}>
          {t('theme_switch', {
            name: t(`theme_${isThemeDark ? 'light' : 'dark'}`),
          })}
        </CatButton>

        <CatButton onPress={clearSiteSelection}>Clear site selection</CatButton>
        <RadioButton.Group
          onValueChange={changeShift}
          value={currentShift?.id ?? ''}>
          {latestShifts?.map(shift => (
            <RadioButton.Item
              key={shift.id}
              label={shift.name}
              value={shift.id}
            />
          ))}
        </RadioButton.Group>
      </ScrollView>
    </CatScreen>
  );
};

export default DebugScreen;
