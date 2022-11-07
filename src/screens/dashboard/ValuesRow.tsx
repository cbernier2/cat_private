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
        <View key={i} style={{width: 100 / values.length + '%'}}>
          <CatTextWithLabel
            variant={'titleLarge'}
            style={[styles.valuesRowText, valueStyle]}
            {...valueProps}
          />
        </View>
      ))}
    </View>
  );
};

export default CatValuesRow;
