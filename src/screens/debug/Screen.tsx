import React from 'react';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import useCatSelector from '../../hooks/useCatSelector';
import {offlineQueueTest, appActions} from '../../redux/app/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {emulateOfflineSelector} from '../../redux/app/app-selectors';
import {selectSiteAsyncAction} from '../../redux/sites-list/sites-slice';
import {
  siteActions,
  fetchShiftDataAsyncAction,
} from '../../redux/site/site-slice';

import {DebugScreenType} from './types';
import CatSpacer from '../../components/spacer';

const DebugScreen: React.FC<DebugScreenType> = props => {
  const dispatch = useCatDispatch();
  const actionQueue = useCatSelector(state => state.network.actionQueue);
  const {t} = useTranslation();
  const isThemeDark = useCatSelector(state => state.app.isThemeDark);
  const currentShift = useCatSelector(state => state.site.currentShift);
  const latestShifts = useCatSelector(state => state.site.latestShifts);

  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);

  const cancel = async () => {
    await dispatch(appActions.offlineCancelTest());
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
    <CatScreen safeAreaEdges={['bottom', 'top', 'left', 'right']}>
      <CatSpacer />
      <CatSpacer />
      <CatButton onPress={() => dispatch(appActions.toggleOffline())}>
        Emulate offline ({isEmulatingOffline ? 'On' : 'Off'})
      </CatButton>
      <CatButton onPress={queue}>Queue a thing</CatButton>
      <CatButton onPress={cancel}>Cancel queue</CatButton>

      <CatText>{JSON.stringify(actionQueue)}</CatText>

      <CatButton onPress={() => dispatch(appActions.toggleTheme())}>
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
    </CatScreen>
  );
};

export default DebugScreen;
