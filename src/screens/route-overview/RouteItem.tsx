import React from 'react';
import {View} from 'react-native';
import {CatRouteItemType} from './types';
import {Surface} from 'react-native-paper';
import styles from './styles';
import CatTextWithIcon from '../../components/text-with-icon';

const CatRouteItem: React.FC<CatRouteItemType> = ({name, icon, children}) => {
  return (
    <Surface elevation={2} style={styles.cardContainer}>
      <View style={styles.cardItem}>
        <CatTextWithIcon style={styles.areaText} iconNode={icon}>
          {name}
        </CatTextWithIcon>
      </View>
      <View>{children}</View>
    </Surface>
  );
};

export default CatRouteItem;
