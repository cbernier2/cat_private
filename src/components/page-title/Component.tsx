import React from 'react';
import {TextStyle, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {isString} from 'lodash';

import useCatTheme from '../../hooks/useCatTheme';

import CatText from '../text';
import {MinestarIcon} from '../minestar-icon';
import {MinestarIconName} from '../minestar-icon/types';

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
      {isString(props.icon) ? (
        <MinestarIcon
          style={styles.titleIcon}
          name={props.icon as MinestarIconName}
          size={24}
        />
      ) : (
        props.icon
      )}
      <CatText variant={'bodyLarge'} style={titleTextStyle}>
        {title}
      </CatText>
    </View>
  );
};
