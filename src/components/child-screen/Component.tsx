import React from 'react';
import {CatChildScreenType} from './types';
import styles from './styles';
import {TextStyle, TouchableOpacity, View} from 'react-native';
import CatScreen from '../screen';
import {MinestarIcon} from '../minestar-icon';
import CatText from '../text';
import useCatTheme from '../../hooks/useCatTheme';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const CatChildScreen: React.FC<CatChildScreenType> = ({
  childTitle,
  iconName,
  children,
  ...screenProps
}) => {
  const navigation = useNavigation();
  const {colors} = useCatTheme();
  const {t} = useTranslation();

  const titleTextStyle: TextStyle[] = [styles.titleText];
  if (childTitle === undefined) {
    childTitle = t('cat.undefined');
    titleTextStyle.push({color: colors.secondary});
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          onPress={() => navigation.goBack()}>
          <MinestarIcon
            name="edge_arrow_back_ios"
            size={16}
            color={colors.text}
          />
        </TouchableOpacity>
        <MinestarIcon
          name={iconName}
          style={styles.titleIcon}
          size={24}
          color={colors.text}
        />
        <CatText variant={'bodyLarge'} style={titleTextStyle}>
          {childTitle}
        </CatText>
      </View>
      <CatScreen children={children} {...screenProps} />
    </View>
  );
};

export default CatChildScreen;
