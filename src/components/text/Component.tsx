import React from 'react';
import {Text} from 'react-native-paper';
import {CatTextType} from './types';

const CatText: React.FC<CatTextType> = props => {
  const {variant = 'bodyMedium'} = props;

  return <Text {...props} variant={variant} />;
};

export default CatText;
