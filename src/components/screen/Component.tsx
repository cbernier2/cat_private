import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CatScreenType} from './types';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';

const CatScreen: React.FC<CatScreenType> = ({children}) => {
  const {colors} = useCatTheme();

  return (
    <SafeAreaView
      style={[styles.background, {backgroundColor: colors.screenBackground}]}>
      {children}
    </SafeAreaView>
  );
};

export default CatScreen;
