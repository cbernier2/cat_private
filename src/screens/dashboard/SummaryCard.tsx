import React from 'react';
import {CatSummaryCardType} from './types';
import {Pressable, View, ViewStyle} from 'react-native';
import {useStyles} from './styles';
import CatTextWithIcon from '../../components/text-with-icon';
import {formatLabel, formatUnit} from '../../utils/format';
import CatValuesRow from '../../components/value-row';
import CatCard from '../../components/card';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({
  title,
  summary,
  hasError,
  onPress,
}) => {
  const styles = useStyles();

  const containerStyle: ViewStyle[] = [styles.cardContainer];
  if (hasError) {
    containerStyle.push(styles.cardContainerError);
  }
  return (
    <Pressable onPress={onPress}>
      <CatCard style={containerStyle}>
        <View style={styles.cardTitle}>
          <CatTextWithIcon {...title} />
        </View>
        <CatValuesRow
          values={[
            {
              label: formatLabel(
                'cat.production_secondary_total',
                summary.totalLoadsUnit,
              ),
              children: formatUnit(summary.totalValue),
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
                summary.projectedUnit,
              ),
              children: formatUnit(summary.projectedValue),
            },
            {
              label: formatLabel('cat.production_target', summary.targetUnit),
              children: formatUnit(summary.targetValue),
              isDown: hasError,
            },
          ]}
        />
      </CatCard>
    </Pressable>
  );
};

export default CatSummaryCard;
