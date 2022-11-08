import React from 'react';
import {CatSummaryCardType} from './types';
import {Surface} from 'react-native-paper';
import ValuesRow from './ValuesRow';
import {View, ViewStyle} from 'react-native';
import {useStyles} from './styles';
import CatTextWithIcon from '../../components/text-with-icon';
import {formatLabel, formatUnit} from '../../utils/format';
import {SUMMARY_COLUMNS, TARGET_COLUMN} from './constants';
import {UnitType} from '../../api/types/cat/common';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({
  title,
  summary,
  unitType,
  hasError,
}) => {
  const styles = useStyles();
  const totalLoadColumn = SUMMARY_COLUMNS.total[UnitType.LOAD];
  const projectedColumn = SUMMARY_COLUMNS.projected[unitType];

  const containerStyle: ViewStyle[] = [styles.cardContainer];
  if (hasError) {
    containerStyle.push(styles.cardContainerError);
  }
  return (
    <Surface elevation={2} style={containerStyle}>
      <View style={styles.cardTitle}>
        <CatTextWithIcon {...title} />
      </View>
      <ValuesRow
        values={[
          {
            label: formatLabel(
              'cat.production_secondary_total',
              summary,
              totalLoadColumn.unit,
            ),
            children: formatUnit(summary, totalLoadColumn),
            isPrimary: true,
          },
        ]}
      />
      <View style={styles.cardRowsSpacer} />
      <ValuesRow
        values={[
          {
            label: formatLabel(
              'production_projected_short',
              summary,
              projectedColumn.unit,
            ),
            children: formatUnit(summary, projectedColumn),
          },
          {
            label: formatLabel(
              'cat.production_target',
              summary,
              TARGET_COLUMN.unit,
            ),
            children: formatUnit(summary, TARGET_COLUMN),
            isDown: hasError,
          },
        ]}
      />
    </Surface>
  );
};

export default CatSummaryCard;
