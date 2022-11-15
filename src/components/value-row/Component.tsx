import React from 'react';
import {CatValuesRowType} from './types';
import {View} from 'react-native';
import styles from './styles';
import CatTextWithLabel from '../text-with-label';

const CatValuesRow: React.FC<CatValuesRowType> = ({values, style}) => {
  return (
    <View style={[styles.container, style]}>
      {values.map(({style: valueStyle, ...valueProps}, i) => (
        <View key={i} style={{width: 100 / values.length + '%'}}>
          <CatTextWithLabel
            variant={'titleLarge'}
            style={[styles.text, valueStyle]}
            {...valueProps}
          />
        </View>
      ))}
    </View>
  );
};

export default CatValuesRow;
