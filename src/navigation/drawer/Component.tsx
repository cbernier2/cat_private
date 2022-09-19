import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import styles from './styles';

const CatDrawer: React.FC<CatDrawerType> = () => {
  return (
    <View style={styles.container}>
      <CatText>{'Drawer'}</CatText>
    </View>
  );
};

export default CatDrawer;
