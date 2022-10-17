import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CatScreenType} from './types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const CatScreen: React.FC<CatScreenType> = ({children, title}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      title,
    });
  }, [navigation, title]);

  return <SafeAreaView style={[styles.background]}>{children}</SafeAreaView>;
};

export default CatScreen;
