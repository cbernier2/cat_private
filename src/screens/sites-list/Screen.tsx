import React, {useEffect, useState} from 'react';
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
  sitesSitesSelector,
} from '../../redux/sites-list/sites-selectors';
import {
  fetchSitesAsyncAction,
  selectSiteAsyncAction,
  Site,
} from '../../redux/sites-list/sites-slice';

import {SitesListTypes} from './types';
import styles from './styles';

export const SitesListScreen: React.FC<SitesListTypes> = props => {
  const root = Boolean(props.route.params?.root);
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const error = useCatSelector(sitesErrorSelector);
  const loading = useCatSelector(sitesLoadingSelector);
  const sites = useCatSelector(sitesSitesSelector);
  const [filter, setFilter] = useState<string>('');
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);

  useEffect(() => {
    dispatch(fetchSitesAsyncAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (root && sites.length === 1) {
      dispatch(selectSiteAsyncAction(sites[0]));
    }
  }, [dispatch, root, sites]);

  useEffect(() => {
    // TODO refine filter method depending object format and filter requirements
    setFilteredSites(
      sites.filter((site: Site) =>
        site.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [filter, sites]);

  const onSelect = async (site: Site) => {
    await dispatch(selectSiteAsyncAction(site));
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
            <ActivityIndicator animating={loading} />
            <CatError
              style={styles.mh}
              visible={Boolean(error)}
              message={error}
            />
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
