import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import {Avatar} from 'react-native-paper';
import useCatDispatch from '../../hooks/useCatDispatch';
import {toggleTheme} from '../../redux/app-slice';
import useCatSelector from '../../hooks/useCatSelector';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatMenuItem = ({
  children,
  onPress,
  subText,
  icon,
}: {
  children: React.ReactNode;
  onPress: () => void;
  subText?: string;
  icon?: string;
}) => {
  const {colors} = useCatTheme();

  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemTextContainer}>
        <CatText variant={'titleLarge'} onPress={onPress}>
          {children}
        </CatText>
        {subText && (
          <CatText variant={'labelLarge'} style={styles.menuItemSubText}>
            {subText}
          </CatText>
        )}
      </View>
      {icon && <MaterialIcons name={icon} size={32} color={colors.title} />}
    </View>
  );
};

const CatDrawer: React.FC<CatDrawerType> = ({navigation}) => {
  const dispatch = useCatDispatch();
  const {t} = useTranslation();
  const isThemeDark = useCatSelector(state => state.app.isThemeDark);
  const {colors} = useCatTheme();

  const userName = 'John Doe'; // TODO
  const siteName = 'Rasmussen Valley Clone'; // TODO

  return (
    <View style={styles.menuContainer}>
      <View
        style={[{backgroundColor: colors.grey0}, styles.menuHeaderContainer]}>
        <MaterialIcons
          name={'close'}
          color={colors.grey100}
          size={32}
          onPress={() => navigation.closeDrawer()}
        />
      </View>
      <View style={styles.menuBodyContainer}>
        <View style={styles.menuUserNameContainer}>
          <Avatar.Text size={48} label="JD" />
          <CatText variant={'titleLarge'} style={styles.userName}>
            {userName}
          </CatText>
        </View>
        <View style={styles.menuItemsContainer}>
          <CatMenuItem onPress={() => {}} subText={siteName}>
            {t('side_menu_switch_site')}
          </CatMenuItem>
          <View style={styles.menuItemSpacer} />
          <CatMenuItem onPress={() => dispatch(toggleTheme())}>
            {t('theme_switch', {
              name: t(`theme_${isThemeDark ? 'light' : 'dark'}`),
            })}
          </CatMenuItem>
          <View style={styles.menuItemsMiddle} />
          <CatMenuItem onPress={() => {}}>{t('side_menu_legal')}</CatMenuItem>
          <View style={styles.menuItemSpacer} />
          <CatMenuItem onPress={() => {}}>{t('side_menu_help')}</CatMenuItem>
          <View style={styles.menuItemSpacer} />
          <View style={styles.menuItemSpacer} />
          <CatMenuItem icon="logout" onPress={() => {}}>
            {t('side_menu_logout')}
          </CatMenuItem>
        </View>
      </View>
    </View>
  );
};

export default CatDrawer;
