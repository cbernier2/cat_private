import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Drawer} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MineStarLogo from '../../../assets/MineStarLogo.svg';

import useCatTheme from '../../hooks/useCatTheme';
import {logoutAsyncAction} from '../../redux/user/user-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import useCatSelector from '../../hooks/useCatSelector';
import {sitesSelectedSiteSelector} from '../../redux/sites-list/sites-selectors';

import {CatDrawerType} from './types';

import {CatExternalLink} from './external-link';
import {CatMenuItem} from './MenuItem';
import {useStyles} from './styles';
import {userNameSelector} from '../../redux/user/user-selectors';
import {personsSelector} from '../../redux/site/site-selectors';
import CatUserBanner from '../../components/user-banner';
import {findPersonByUserName} from '../../api/person';

const CatDrawer: React.FC<CatDrawerType> = ({navigation}) => {
  const dispatch = useCatDispatch();
  const {t} = useTranslation();
  const {colors} = useCatTheme();
  const selectedSite = useCatSelector(sitesSelectedSiteSelector);
  const userName = useCatSelector(userNameSelector);
  const persons = useCatSelector(personsSelector);
  const person = findPersonByUserName(persons, userName);
  const styles = useStyles();
  const siteName = selectedSite?.siteName ?? '';

  return (
    <SafeAreaView style={styles.menuContainer}>
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
        <CatUserBanner style={styles.menuUserNameContainer} person={person} />
        <Drawer.Section title={siteName}>
          <CatMenuItem
            onPress={() => navigation.navigate('SwitchSite')}
            label={t('side_menu_switch_site')}
            icon={'swap-horiz'}
          />
        </Drawer.Section>
        <Drawer.Section>
          <CatExternalLink
            /* TODO are we always sending to the EN version?
                If other versions exist, simply changing `en` to another ISO-639 code doesn't work */
            url="https://www.caterpillar.com/en/legal-notices/minestar-legal.html"
            label={t('cat.legal_page_title')}
            icon={'copyright'}
          />
          <CatExternalLink
            url="https://google.com"
            label={t('side_menu_help')}
            icon={'help'}
          />
        </Drawer.Section>
        <Drawer.Section>
          <CatMenuItem
            icon="logout"
            onPress={() => dispatch(logoutAsyncAction())}
            label={t('cat.button_sign_out')}
          />
        </Drawer.Section>
      </View>
    </SafeAreaView>
  );
};

export default CatDrawer;
