import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
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
    return sites.filter((site: Site) =>
      site.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, sites]);

  const onSelect = async (site: Site) => {
    const selectedSite = sitesSelectedSiteSelector(store.getState());
    if (site.id !== selectedSite?.id) {
      await dispatch(selectSiteAsyncAction(site));
    }
    if (!root) {
      props.navigation.navigate('Dashboard');
    }
  };

  return (
    <CatScreen title={t('my_sites')}>
      <View style={styles.container}>
        <CatTextInput
          style={styles.mh}
          label={t('cat.button_search')}
          value={filter}
          onChangeText={value => setFilter(value)}
        />
        <List.Section>
          <List.Subheader>{t('my_sites')}</List.Subheader>
          <ScrollView>
            <ActivityIndicator
              animating={loadingSites || loadingSelectedSite}
            />
            <CatError style={styles.mh} message={error?.message} />
            {/* TODO hide while loading? */}
            {filteredSites.map((site: Site) => (
              <List.Item
                key={site.id}
                title={site.name}
                onPress={() => onSelect(site)}
              />
            ))}
          </ScrollView>
        </List.Section>
      </View>
    </CatScreen>
  );
};
