import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {Avatar} from 'react-native-paper';
import useCatDispatch from '../../hooks/useCatDispatch';
import {toggleTheme} from '../../redux/app-slice';

const CatDrawer: React.FC<CatDrawerType> = () => {
  const dispatch = useCatDispatch();

  return (
    <View>
      <CatText>{'Drawer'}</CatText>

      <Avatar.Text size={24} label="JD" />
      <CatButton onPress={() => dispatch(toggleTheme())}>
        Change theme
      </CatButton>
    </View>
  );
};

export default CatDrawer;
