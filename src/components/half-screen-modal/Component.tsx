import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {HalfScreenModalType} from './types';
import {useStyles} from './styles';

export const HalfScreenModal: React.FC<HalfScreenModalType> = props => {
  const {ratio = '1:1'} = props;
  const styles = useStyles(ratio);

  const dismiss = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.fill}>
      <TouchableWithoutFeedback style={styles.top} onPress={dismiss}>
        <BlurView style={styles.fill} blurAmount={1} blurType="material" />
      </TouchableWithoutFeedback>
      <View style={styles.bottom}>{props.children}</View>
    </View>
  );
};
