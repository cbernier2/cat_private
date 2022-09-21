import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CatScreenType} from './types';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';
import {useNavigation} from '@react-navigation/native';

const CatScreen: React.FC<CatScreenType> = ({children, title}) => {
  const {colors} = useCatTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      title,
    });
  }, [navigation, title]);

  return (
    <SafeAreaView
      style={[styles.background, {backgroundColor: colors.screenBackground}]}>
      {children}
    </SafeAreaView>
  );
};

export default CatScreen;
