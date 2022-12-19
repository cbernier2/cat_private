import React from 'react';
import {TextStyle, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import useCatTheme from '../../hooks/useCatTheme';

import CatText from '../text';
import {MinestarIcon} from '../minestar-icon';

import {PageTitleType} from './types';
import styles from './styles';

export const PageTitle = (props: PageTitleType) => {
  const navigation = useNavigation();
  const {colors} = useCatTheme();
  const {t} = useTranslation();

  const {title = t('cat.undefined')} = props;

  const titleTextStyle: TextStyle[] = [styles.titleText];
  if (title === t('cat.undefined')) {
    titleTextStyle.push({color: colors.primary});
  }

  const handlePress = () => {
    if (typeof props.onBack === 'function') {
      return props.onBack();
    }

    navigation.goBack();
  };

  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        onPress={handlePress}>
        <MinestarIcon name="edge_arrow_back_ios" size={16} />
      </TouchableOpacity>
      <MinestarIcon style={styles.titleIcon} name={props.icon} size={24} />
      <CatText variant={'bodyLarge'} style={titleTextStyle}>
        {title}
      </CatText>
    </View>
  );
};
