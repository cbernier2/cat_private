import React from 'react';
import {Card} from 'react-native-paper';

import CatText from '../text';

import {CatErrorType} from './types';
import {useStyles} from './styles';

export const CatError: React.FC<CatErrorType> = props => {
  const styles = useStyles();

  if (!props.message) {
    return null;
  }

  return (
    <Card style={[styles.card, props.style]}>
      <Card.Content>
        <CatText style={styles.cardContent}>{props.message}</CatText>
      </Card.Content>
    </Card>
  );
};
