import React from 'react';
import {View} from 'react-native';

import {HalfScreenModal} from '../../components/half-screen-modal/Component';
import CatText from '../../components/text';

import {TestType} from './types';
import {useStyles} from './styles';

export const Test: React.FC<TestType> = props => {
  const styles = useStyles();

  return (
    <HalfScreenModal {...props} ratio="1:3">
      <View style={styles.main}>
        <CatText>Test partial modal</CatText>
      </View>
    </HalfScreenModal>
  );
};
