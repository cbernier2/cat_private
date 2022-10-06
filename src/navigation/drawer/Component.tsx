import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {Avatar} from 'react-native-paper';
import useCatDispatch from '../../hooks/useCatDispatch';
import {toggleOffline, toggleTheme} from '../../redux/app-slice';
import useCatSelector from '../../hooks/useCatSelector';
import {emulateOfflineSelector} from '../../redux/app-selectors';

const CatDrawer: React.FC<CatDrawerType> = () => {
  const dispatch = useCatDispatch();
  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);

  return (
    <View>
      <CatText>{'Drawer'}</CatText>

      <Avatar.Text size={24} label="JD" />
      <CatButton onPress={() => dispatch(toggleTheme())}>
        Change theme
      </CatButton>
      <CatButton onPress={() => dispatch(toggleOffline())}>
        Emulate offline ({isEmulatingOffline ? 'On' : 'Off'})
      </CatButton>
    </View>
  );
};

export default CatDrawer;
