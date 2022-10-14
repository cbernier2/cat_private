import React from 'react';
import {ScrollView} from 'react-native';
import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import useCatSelector from '../../hooks/useCatSelector';
import {
  offlineQueueTest,
  offlineCancelTest,
  toggleOffline,
} from '../../redux/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';

import {DebugcreenType} from './types';
import {emulateOfflineSelector} from '../../redux/app-selectors';

const DebugScreen: React.FC<DebugcreenType> = props => {
  const dispatch = useCatDispatch();
  const actionQueue = useCatSelector(state => state.network.actionQueue);

  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);

  // hardcoded PO actions, since thunks seem to have some issues being set into the queue
  const cancel = async () => {
    await dispatch(offlineCancelTest());
    props.navigation.navigate('Dashboard');
  };

  const queue = async () => {
    await dispatch(offlineQueueTest());
    props.navigation.navigate('Dashboard');
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
      </ScrollView>
    </CatScreen>
  );
};

export default DebugScreen;
