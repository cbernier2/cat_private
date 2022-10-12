import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CatScreenType} from './types';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const CatScreen: React.FC<CatScreenType> = ({children, title}) => {
  const {colors} = useCatTheme();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (title) {
        navigation.getParent()?.getParent()?.setOptions({
          title,
        });
      }
    }, [navigation, title]),
  );

  return (
    <SafeAreaView
      style={[styles.background, {backgroundColor: colors.background}]}>
      {children}
    </SafeAreaView>
  );
};

export default CatScreen;
