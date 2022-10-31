import React from 'react';
import {ScrollView} from 'react-native';
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
} from '../../redux/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {emulateOfflineSelector} from '../../redux/app-selectors';
import {selectSiteAsyncAction} from '../../redux/sites/sites-slice';

import {DebugScreenType} from './types';

const DebugScreen: React.FC<DebugScreenType> = props => {
  const dispatch = useCatDispatch();
  const actionQueue = useCatSelector(state => state.network.actionQueue);
  const {t} = useTranslation();
  const isThemeDark = useCatSelector(state => state.app.isThemeDark);

  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);

  const cancel = async () => {
    await dispatch(offlineCancelTest());
    props.navigation.navigate('Dashboard');
  };

  const queue = async () => {
    await dispatch(offlineQueueTest());
    props.navigation.navigate('Dashboard');
  };

  const clearSiteSelection = async () => {
    await dispatch(selectSiteAsyncAction(null));
    props.navigation.popToTop();
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
      </ScrollView>
    </CatScreen>
  );
};

export default DebugScreen;
