import React from 'react';
import {Surface} from 'react-native-paper';
import {CatCardType} from './types';
import styles from './styles';

const CatCard: React.FC<CatCardType> = ({style, children, ...surfaceProps}) => {
  return (
    <Surface elevation={2} style={[styles.container, style]} {...surfaceProps}>
      {children}
    </Surface>
  );
};

export default CatCard;
