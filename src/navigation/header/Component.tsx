import React from 'react';
import {View} from 'react-native';
import {CatHeaderType} from './types';
import CatText from '../../components/text';
import useCatSelector from '../../hooks/useCatSelector';
import {networkIsConnectedSelector} from '../../redux/network-selectors';

const CatHeader: React.FC<CatHeaderType> = ({children}) => {
  const isConnected = useCatSelector(networkIsConnectedSelector);

  return (
    <View>
      <CatText>{children}</CatText>
      {isConnected ? (
        <CatText>Connected</CatText>
      ) : (
        <CatText>Disconnected</CatText>
      )}
    </View>
  );
};

export default CatHeader;
