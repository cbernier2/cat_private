import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {CatError} from '../../components/error';
import CatScreen from '../../components/screen';
import CatTextInput from '../../components/text-input';
import useCatDispatch from '../../hooks/useCatDispatch';
import useCatSelector from '../../hooks/useCatSelector';
import {
  sitesErrorSelector,
  sitesLoadingSelector,
  sitesSelectedSiteSelector,
  sitesSitesSelector,
} from '../../redux/sites-list/sites-selectors';
import {
  fetchSitesAsyncAction,
  selectSiteAsyncAction,
  Site,
} from '../../redux/sites-list/sites-slice';

import {SitesListTypes} from './types';
import styles from './styles';
import {siteIsLoadingSelector} from '../../redux/site/site-selectors';
import useCatStore from '../../hooks/useCatStore';
import {fetchSiteAsyncAction} from '../../redux/site/site-slice';

export const SitesListScreen: React.FC<SitesListTypes> = props => {
  const root = Boolean(props.route.params?.root);
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const store = useCatStore();
  const error = useCatSelector(sitesErrorSelector);
  const loadingSites = useCatSelector(sitesLoadingSelector);
  const loadingSelectedSite = useCatSelector(siteIsLoadingSelector);
  const sites = useCatSelector(sitesSitesSelector);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSitesAsyncAction());
  }, [dispatch]);

  useEffect(() => {
    const selectedSite = sitesSelectedSiteSelector(store.getState());
    const currentSites = sitesSitesSelector(store.getState());
    if (root && currentSites.length === 1 && selectedSite === null) {
      dispatch(selectSiteAsyncAction(currentSites[0]));
    }
  }, [dispatch, store, root]);

  const filteredSites = useMemo(() => {
    return sites.filter(site =>
      site.siteName.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, sites]);

  const onSelect = async (site: Site) => {
    const selectedSite = sitesSelectedSiteSelector(store.getState());
    if (site.siteUrl !== selectedSite?.siteUrl) {
      await dispatch(selectSiteAsyncAction(site));
    } else {
      await dispatch(fetchSiteAsyncAction());
    }
    if (!root) {
      props.navigation.navigate('Dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CatScreen title={t('my_sites')}>
        <CatTextInput
          style={styles.mh}
          label={t('cat.button_search')}
          value={filter}
          onChangeText={value => setFilter(value)}
        />
        <List.Section style={styles.mh}>
          <List.Subheader>{t('my_sites')}</List.Subheader>
          <ScrollView>
            <ActivityIndicator
              animating={loadingSites || loadingSelectedSite}
            />
            <CatError style={styles.mh} message={error && t(error)} />
            {/* TODO hide while loading? */}
            {filteredSites.map((site, i) => (
              <List.Item
                key={`s${i}`}
                title={site.siteName}
                onPress={() => onSelect(site)}
              />
            ))}
          </ScrollView>
        </List.Section>
      </CatScreen>
    </SafeAreaView>
  );
};
