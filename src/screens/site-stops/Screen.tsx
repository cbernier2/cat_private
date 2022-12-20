import React, {useState} from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';
import {TabView} from 'react-native-tab-view';
import {useWindowDimensions, View} from 'react-native';
import {useStyles} from './styles';
import CatButton from '../../components/button';
import {stopsScheduleSceneSelector} from './selectors';
import useCatSelector from '../../hooks/useCatSelector';
import CatText from '../../components/text';
import CatStopsFilters from '../../components/stops-filters';
import {CatStopsFiltersType} from '../../components/stops-filters/types';
import {formatTime} from '../../utils/format';

const SiteStopsScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const layout = useWindowDimensions();
  const styles = useStyles();
  const [index, setIndex] = useState(0);
  const [filters, setFilters] = useState<CatStopsFiltersType>({
    infiniteOnly: false,
    noReasonOnly: false,
  });
  const {routes, renderScene} = useCatSelector(stopsScheduleSceneSelector);
  if (routes.length === 0) {
    return null;
  } else if (routes.length <= index) {
    setIndex(0);
    return null;
  }
  const currentPage = routes[index].value;

  return (
    <CatScreen scroll={false} title={t('cat.site_stops')}>
      <View style={styles.headerContainer}>
        <View style={styles.timeSelectorContainer}>
          <CatText variant={'headlineMedium'} style={styles.timeSelectorText}>
            {formatTime(currentPage[0]) +
              '-' +
              formatTime(currentPage[currentPage.length - 1])}
          </CatText>
          <View style={styles.timeSelectorPageIndicator}>
            {routes.map((route, i) => (
              <View
                key={route.key}
                style={[
                  styles.timeSelectorPageBadge,
                  index === i ? styles.badgeSelected : undefined,
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.filterButtonsContainer}>
          <CatStopsFilters
            onChange={newFilters => setFilters(newFilters)}
            initialState={filters}
          />
        </View>
      </View>
      <View>
        <CatButton labelStyle={styles.addButtonLabel} style={styles.addButton}>
          {'+'}
        </CatButton>
      </View>
      <TabView
        style={styles.tabView}
        navigationState={{index, routes}}
        renderScene={renderScene}
        lazy={false}
        swipeEnabled={true}
        onIndexChange={setIndex}
        renderTabBar={() => {
          return <></>;
        }}
        initialLayout={{width: layout.width}}
      />
    </CatScreen>
  );
};

export default SiteStopsScreen;
