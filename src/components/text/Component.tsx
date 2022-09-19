import React from 'react';
import {Text} from 'react-native';
import {CatTextType} from './types';
import styles from './styles';

const CatText: React.FC<CatTextType> = props => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

export default CatText;
