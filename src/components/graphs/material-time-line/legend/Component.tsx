import React from 'react';
import {View} from 'react-native';

import {LegendItem} from './legend-item/Component';
import {LegendType} from './types';
import {styles} from './styles';

export const Legend: React.FC<LegendType> = props => {
  return (
    <View style={styles.container}>
      {props.materials.map((material, i) => (
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
