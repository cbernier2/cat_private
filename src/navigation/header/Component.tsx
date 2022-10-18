import React from 'react';
import {View} from 'react-native';
import {CatHeaderType} from './types';
import CatText from '../../components/text';
import styles from './styles';
import MineStarIconSvg from 'assets/MineStarIcon.svg';

const CatHeader: React.FC<CatHeaderType> = ({children}) => {
  return (
    <View style={styles.container}>
      <MineStarIconSvg width={32} height={32} />
      <CatText style={styles.title}>{children}</CatText>
    </View>
  );
};

export default CatHeader;
