import React from 'react';
import {View} from 'react-native';

const CatSpacer: React.FC<{width?: number; height?: number}> = ({
  width = 15,
  height = 15,
}) => {
  return <View style={{width, height}} />;
};

export default CatSpacer;
