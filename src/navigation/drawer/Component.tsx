import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {ThemePreferencesContext} from '../../themes';
import {Avatar} from 'react-native-paper';

const CatDrawer: React.FC<CatDrawerType> = () => {
  const {toggleTheme} = React.useContext(ThemePreferencesContext);

  return (
    <View>
      <CatText>{'Drawer'}</CatText>

      <Avatar.Text size={24} label="JD" />
      <CatButton onPress={toggleTheme}>Change theme</CatButton>
    </View>
  );
};

export default CatDrawer;
