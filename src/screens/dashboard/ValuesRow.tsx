import React from 'react';
import {CatValuesRowType} from './types';
import {View} from 'react-native';
import styles from './styles';
import CatTextWithLabel from './TextWithLabel';

const CatValuesRow: React.FC<CatValuesRowType> = ({values}) => {
  return (
    <View style={styles.valuesRowContainer}>
      {values.map(value => (
        <CatTextWithLabel {...value} />
      ))}
    </View>
  );
};

export default CatValuesRow;
