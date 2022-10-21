import React from 'react';
import {CatValuesRowType} from './types';
import {View} from 'react-native';
import {useStyles} from './styles';
import CatTextWithLabel from '../../components/text-with-label';

const CatValuesRow: React.FC<CatValuesRowType> = ({values, style}) => {
  const styles = useStyles();

  return (
    <View style={[styles.valuesRowContainer, style]}>
      {values.map(({style: valueStyle, ...valueProps}, i) => (
        <CatTextWithLabel
          key={i}
          variant={'titleLarge'}
          style={[styles.valuesRowText, valueStyle]}
          {...valueProps}
        />
      ))}
    </View>
  );
};

export default CatValuesRow;
