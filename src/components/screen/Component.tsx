import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CatScreenType} from './types';
import styles from './styles';

const CatScreen: React.FC<CatScreenType> = ({children}) => {
  return <SafeAreaView style={[styles.background]}>{children}</SafeAreaView>;
};

export default CatScreen;
