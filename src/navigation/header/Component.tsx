import React from 'react';
import {View} from 'react-native';
import {CatHeaderType} from './types';
import CatText from '../../components/text';
import styles from './styles';

const CatHeader: React.FC<CatHeaderType> = ({children}) => {
  return (
    <View style={styles.container}>
      <CatText style={styles.title}>{children}</CatText>
    </View>
  );
};

export default CatHeader;
