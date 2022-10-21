import React from 'react';
import {CatSummaryCardType} from './types';
import {Surface} from 'react-native-paper';
import ValuesRow from './ValuesRow';
import {View, ViewStyle} from 'react-native';
import {useStyles} from './styles';
import {useTranslation} from 'react-i18next';
import {numberWithCommas, unitTranslateKey} from '../../utils/units';
import CatTextWithIcon from '../../components/text-with-icon';

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
              t(unitTranslateKey(unit)),
            isDown: false,
            children: numberWithCommas(total),
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
            children: numberWithCommas(projected),
          },
          {
            label: t('cat.production_target'),
            isDown: hasError,
            children: numberWithCommas(target),
          },
        ]}
      />
    </Surface>
  );
};

export default CatSummaryCard;
