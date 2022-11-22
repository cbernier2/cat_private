import React from 'react';
import {TextStyle, View} from 'react-native';
import {CatRouteItemType} from './types';
import {Surface} from 'react-native-paper';
import styles from './styles';
import CatTextWithIcon from '../../components/text-with-icon';
import {useTranslation} from 'react-i18next';
import useCatTheme from '../../hooks/useCatTheme';

const CatRouteItem: React.FC<CatRouteItemType> = ({name, icon, children}) => {
  const {t} = useTranslation();
  const {colors} = useCatTheme();
  if (name === 'Unknown') {
    name = undefined;
  }
  const extraStyle: TextStyle = name ? {} : {color: colors.secondary};

  return (
    <Surface elevation={2} style={styles.cardContainer}>
      <View style={styles.cardItem}>
        <CatTextWithIcon style={[styles.areaText, extraStyle]} iconNode={icon}>
          {name ?? t('cat.undefined')}
        </CatTextWithIcon>
      </View>
      <View>{children}</View>
    </Surface>
  );
};

export default CatRouteItem;
