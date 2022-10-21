import React from 'react';
import {CatActiveItemsSectionType} from './types';
import styles from './styles';
import {ScrollView, View} from 'react-native';
import CatText from '../../components/text';

const CatActiveItemsSection: React.FC<CatActiveItemsSectionType> = ({
  title,
  children,
}) => {
  return (
    <>
      <View style={styles.activeProductionItemsHeader}>
        <CatText variant={'labelLarge'}>{title}</CatText>
      </View>
      <ScrollView horizontal={true}>{children}</ScrollView>
    </>
  );
};

export default CatActiveItemsSection;
