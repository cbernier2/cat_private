import React from 'react';
import {View} from 'react-native';

import {MaterialWithMeta} from '../types';

import {LegendItem} from './legend-item/Component';
import {LegendType} from './types';
import {styles} from './styles';

export const Legend: React.FC<LegendType> = props => {
  const sort = (a: MaterialWithMeta, b: MaterialWithMeta) => {
    const an = a.name!;
    const bn = b.name!;

    if (an < bn || an === 'Undefined') {
      return -1;
    }

    if (an > bn || bn === 'Undefined') {
      return 1;
    }

    return 0;
  };

  return (
    <View style={styles.container}>
      {props.materials.sort(sort).map((material, i) => (
        <LegendItem
          key={`l${i}`}
          name={material.name!}
          pattern={material.patternDetails}
          patternId={material.patternId}
          quantity={material.quantity}
        />
      ))}
    </View>
  );
};
