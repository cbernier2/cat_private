import React from 'react';
import {CatValueWithUnitType} from './types';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../text';

const CatValueWithUnit: React.FC<CatValueWithUnitType> = ({
  value,
  unit,
  valueStyle,
  unitStyle,
}) => {
  return (
    <View style={styles.container}>
      <CatText variant={'titleLarge'} style={[styles.valueText, valueStyle]}>
        {value}
      </CatText>
      <CatText variant={'bodyMedium'} style={[styles.unitText, unitStyle]}>
        {unit}
      </CatText>
    </View>
  );
};

export default CatValueWithUnit;
