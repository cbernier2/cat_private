import React from 'react';
import {CatValuesRowType} from './types';
import {View} from 'react-native';
import {useStyles} from './styles';
import CatTextWithLabel from './TextWithLabel';

const CatValuesRow: React.FC<CatValuesRowType> = ({values, style}) => {
  const styles = useStyles();

  return (
    <View style={[styles.valuesRowContainer, style]}>
      {values.map((value, i) => (
        <CatTextWithLabel key={i} variant={'titleLarge'} {...value} />
      ))}
    </View>
  );
};

export default CatValuesRow;
