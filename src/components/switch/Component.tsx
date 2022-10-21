import React from 'react';
import {Switch} from 'react-native-paper';
import {CatSwitchType} from './types';
import {View} from 'react-native';
import CatText from '../text';
import styles from './styles';

const CatSwitch: React.FC<CatSwitchType> = ({label, ...switchProps}) => {
  return (
    <View style={styles.container}>
      <CatText variant={'bodyLarge'}>{label}</CatText>
      <Switch style={[styles.switch, switchProps.style]} {...switchProps} />
    </View>
  );
};

export default CatSwitch;
