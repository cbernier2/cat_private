import React from 'react';
import {CatSummaryCardType} from './types';
import styles from './styles';
import {Surface} from 'react-native-paper';
import TextWithIcon from './TextWithIcon';
import ValuesRow from './ValuesRow';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({title, row1, row2}) => {
  return (
    <Surface style={styles.cardContainer}>
      <TextWithIcon {...title} />
      <ValuesRow {...row1} />
      <ValuesRow {...row2} />
    </Surface>
  );
};

export default CatSummaryCard;
