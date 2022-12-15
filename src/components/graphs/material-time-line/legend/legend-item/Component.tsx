import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Svg, {Circle, Defs} from 'react-native-svg';

import {UnitUtils} from '../../../../../utils/unit-utils';

import CatText from '../../../../text';
import {Pattern} from '../../../pattern/Component';

import {LegendItemType} from './types';
import {useStyles} from './styles';

export const LegendItem: React.FC<LegendItemType> = props => {
  const {name = '', pattern, patternId, quantity} = props;
  const styles = useStyles();

  const {i18n, t} = useTranslation();

  const getQtyLabel = () => {
    if (quantity) {
      const unit = UnitUtils.toPreferredLocalUnitSymbol(
        quantity.unit.toString(),
      );
      const value = Math.round(
        UnitUtils.toLocalUnitValue(quantity.value, quantity.unit.toString()) ??
          0,
      ).toLocaleString(i18n.language);

      return `${value} ${unit}`;
    }

    return '';
  };

  const label = name === 'Undefined' ? t('cat.undefined') : name;

  return (
    <View style={styles.container}>
      <Svg width={17} height={16}>
        <Defs>
          <Pattern {...pattern} />
        </Defs>
        <Circle cx={5} cy={8} r={5} fill={`url(#${patternId})`} />
      </Svg>
      <CatText variant={'bodySmall'} style={styles.labelText}>
        {label}
      </CatText>
      <CatText variant={'bodySmall'} style={styles.unitText}>
        {getQtyLabel()}
      </CatText>
    </View>
  );
};
