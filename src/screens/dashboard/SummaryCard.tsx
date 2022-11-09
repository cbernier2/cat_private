import React from 'react';
import {CatSummaryCardType} from './types';
import {Surface} from 'react-native-paper';
import {Pressable, View, ViewStyle} from 'react-native';
import {useStyles} from './styles';
import CatTextWithIcon from '../../components/text-with-icon';
import {formatLabel, formatUnit} from '../../utils/format';
import {SUMMARY_COLUMNS, TARGET_COLUMN} from '../../api/production';
import {UnitType} from '../../api/types/cat/common';
import CatValuesRow from '../../components/value-row';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({
  title,
  summary,
  unitType,
  hasError,
  onPress,
}) => {
  const styles = useStyles();
  const totalLoadColumn = SUMMARY_COLUMNS.total[UnitType.LOAD];
  const projectedColumn = SUMMARY_COLUMNS.projected[unitType];

  const containerStyle: ViewStyle[] = [styles.cardContainer];
  if (hasError) {
    containerStyle.push(styles.cardContainerError);
  }
  return (
    <Pressable onPress={onPress}>
      <Surface elevation={2} style={containerStyle}>
        <View style={styles.cardTitle}>
          <CatTextWithIcon {...title} />
        </View>
        <CatValuesRow
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
        <CatValuesRow
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
    </Pressable>
  );
};

export default CatSummaryCard;
