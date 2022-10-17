import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Avatar} from 'react-native-paper';

import CatText from '../../components/text';
import CatButton from '../../components/button';
import useCatDispatch from '../../hooks/useCatDispatch';
import {toggleOffline, toggleTheme} from '../../redux/app-slice';
import useCatSelector from '../../hooks/useCatSelector';
import {emulateOfflineSelector} from '../../redux/app-selectors';
import {logout} from '../../redux/user-slice';

import {CatDrawerType} from './types';

const CatDrawer: React.FC<CatDrawerType> = () => {
  const dispatch = useCatDispatch();
  const {t} = useTranslation();
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
      <CatButton onPress={() => dispatch(logout())}>
        {t('cat.button_sign_out')}
      </CatButton>
    </View>
  );
};

export default CatDrawer;
