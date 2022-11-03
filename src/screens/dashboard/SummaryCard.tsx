import React from 'react';
import {CatSummaryCardType} from './types';
import {Surface} from 'react-native-paper';
import ValuesRow from './ValuesRow';
import {View, ViewStyle} from 'react-native';
import {useStyles} from './styles';
import {useTranslation} from 'react-i18next';
import CatTextWithIcon from '../../components/text-with-icon';
import {UnitUtils} from '../../utils/unit-utils';
import {formatNumber} from '../../utils/format';

const CatSummaryCard: React.FC<CatSummaryCardType> = ({
  title,
  total,
  projected,
  target,
  unit,
  hasError,
}) => {
  const styles = useStyles();
  const {t} = useTranslation();

  const containerStyle: ViewStyle[] = [styles.cardContainer];
  if (hasError) {
    containerStyle.push(styles.cardContainerError);
  }
  return (
    <Surface elevation={2} style={containerStyle}>
      <CatTextWithIcon style={styles.cardTitle} {...title} />
      <ValuesRow
        values={[
          {
            label:
              t('cat.production_secondary_total') +
              ' ' +
              t(UnitUtils.toLocalisationKey(unit)),
            isDown: false,
            children: formatNumber(total),
            isPrimary: true,
          },
        ]}
      />
      <View style={styles.cardRowsSpacer} />
      <ValuesRow
        values={[
          {
            label: t('cat.production_projected'),
            isDown: false,
            children: formatNumber(projected),
          },
          {
            label: t('cat.production_target'),
            isDown: hasError,
            children: formatNumber(target),
          },
        ]}
      />
    </Surface>
  );
};

export default CatSummaryCard;
