import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Defs} from 'react-native-svg';

import {UnitUtils} from '../../../../../utils/unit-utils';

import CatText from '../../../../text';
import {Pattern} from '../../../pattern/Component';

import {LegendItemType} from './types';
import {styles} from './styles';

export const LegendItem: React.FC<LegendItemType> = props => {
  const {name = '', pattern, patternId, quantity} = props;

  const getQtyLabel = () => {
    if (quantity) {
      const unit = UnitUtils.toPreferredLocalUnitSymbol(
        quantity.unit.toString(),
      );
      const value = Math.round(
        UnitUtils.toLocalUnitValue(quantity.value, quantity.unit.toString()) ??
          0,
      );

      return `${value} ${unit}`;
    }

    return '';
  };

  return (
    <View style={styles.container}>
      <Svg width={17} height={16}>
        <Defs>
          <Pattern {...pattern} />
        </Defs>
        <Circle cx={5} cy={8} r={5} fill={`url(#${patternId})`} />
      </Svg>
      <CatText variant={'bodySmall'} style={styles.labelText}>
        {name}
      </CatText>
      <CatText variant={'bodySmall'} style={styles.unitText}>
        {getQtyLabel()}
      </CatText>
    </View>
  );
};
