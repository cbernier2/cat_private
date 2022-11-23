import React from 'react';
import {Pressable, TextStyle, View} from 'react-native';
import {CatRouteItemType} from './types';
import styles from './styles';
import CatTextWithIcon from '../../components/text-with-icon';
import {useTranslation} from 'react-i18next';
import useCatTheme from '../../hooks/useCatTheme';
import CatCard from '../../components/card';

const CatRouteItem: React.FC<CatRouteItemType> = ({
  name,
  icon,
  onPress,
  children,
}) => {
  const {t} = useTranslation();
  const {colors} = useCatTheme();
  if (name === 'Unknown') {
    name = undefined;
  }
  const extraStyle: TextStyle = name ? {} : {color: colors.secondary};

  return (
    <Pressable onPress={onPress}>
      <CatCard style={styles.cardContainer}>
        <View style={styles.cardItem}>
          <CatTextWithIcon style={[styles.areaText, extraStyle]} icon={icon}>
            {name ?? t('cat.undefined')}
          </CatTextWithIcon>
        </View>
        <View>{children}</View>
      </CatCard>
    </Pressable>
  );
};

export default CatRouteItem;
