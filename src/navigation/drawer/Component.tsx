import React from 'react';
import {View} from 'react-native';
import {CatDrawerType} from './types';
import CatText from '../../components/text';
import {Avatar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {logout} from '../../redux/user-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import MineStarLogo from '../../../assets/MineStarLogo.svg';
import {Drawer} from 'react-native-paper';
import {CatMenuItem} from './MenuItem';

const CatDrawer: React.FC<CatDrawerType> = ({navigation}) => {
  const dispatch = useCatDispatch();
  const {t} = useTranslation();
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
          size={24}
          onPress={() => navigation.closeDrawer()}
        />
        <MineStarLogo color={colors.logoColor} width="100%" />
      </View>

      <View style={styles.menuBodyContainer}>
        <View style={styles.menuUserNameContainer}>
          <Avatar.Text size={40} label="JD" />
          <CatText variant={'titleMedium'} style={styles.userName}>
            {userName}
          </CatText>
        </View>
        <Drawer.Section title={siteName}>
          <CatMenuItem
            onPress={() => {}}
            label={t('side_menu_switch_site')}
            icon={'swap-horiz'}
          />
        </Drawer.Section>
        <Drawer.Section>
          <CatMenuItem
            onPress={() => {}}
            label={t('cat.legal_page_title')}
            icon={'copyright'}
          />
          <CatMenuItem
            onPress={() => {}}
            label={t('side_menu_help')}
            icon={'help'}
          />
        </Drawer.Section>
        <Drawer.Section>
          <CatMenuItem
            icon="logout"
            onPress={() => dispatch(logout())}
            label={t('cat.button_sign_out')}
          />
        </Drawer.Section>
      </View>
    </View>
  );
};

export default CatDrawer;
