import React from 'react';
import {CatSummaryCardType} from './types';
import styles from './styles';
import {Surface} from 'react-native-paper';
import TextWithIcon from './TextWithIcon';
import ValuesRow from './ValuesRow';
import {View, ViewStyle} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({
  title,
  row1,
  row2,
  hasError,
}) => {
  const {colors} = useCatTheme();

  const containerStyle: ViewStyle[] = [styles.cardContainer];
  if (hasError) {
    containerStyle.push(styles.cardContainerError, {borderColor: colors.error});
  }
  return (
    <Surface elevation={2} style={containerStyle}>
      <TextWithIcon style={styles.cardTitle} {...title} />
      <ValuesRow {...row1} />
      <View style={styles.cardRowsSpacer} />
      <ValuesRow {...row2} />
    </Surface>
  );
};

export default CatSummaryCard;
