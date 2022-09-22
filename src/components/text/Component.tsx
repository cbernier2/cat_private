import React from 'react';
import {Text} from 'react-native-paper';
import {CatTextType} from './types';

const CatText: React.FC<CatTextType> = props => {
  return <Text {...props} />;
};

export default CatText;
