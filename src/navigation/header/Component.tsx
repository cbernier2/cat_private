import React from 'react';
import {View} from 'react-native';
import {CatHeaderType} from './types';
import CatText from '../../components/text';

const CatHeader: React.FC<CatHeaderType> = ({children}) => {
  return (
    <View>
      <CatText>{children}</CatText>
    </View>
  );
};

export default CatHeader;
