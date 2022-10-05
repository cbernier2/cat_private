import React from 'react';
import {View} from 'react-native';
import {CatHeaderType} from './types';
import CatText from '../../components/text';
import styles from './styles';

const CatHeader: React.FC<CatHeaderType> = ({children}) => {
  return (
    <View style={styles.container}>
      <View>
        <CatText style={styles.title}>{children}</CatText>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.lastUpdateContainer}>
          <CatText>{'last update'}</CatText>
        </View>
        <View style={styles.statusIconContainer} />
      </View>
    </View>
  );
};

export default CatHeader;
