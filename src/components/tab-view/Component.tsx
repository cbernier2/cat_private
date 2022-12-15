import React, {useMemo} from 'react';
import {CatTabViewType} from './types';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useStyles} from './styles';
import useCatTheme from '../../hooks/useCatTheme';

const CatTabView = (props: CatTabViewType) => {
  const {extraParams = {}, pages} = props;

  const layout = useWindowDimensions();
  const {colors} = useCatTheme();
  const styles = useStyles();
  const [index, setIndex] = React.useState(0);

  const renderScene = useMemo(() => {
    return SceneMap(pages);
  }, [pages]);

  const routes = Object.keys(pages).map(iconName => ({
    key: iconName,
    ...extraParams,
  }));

  return (
    <TabView
      style={styles.tabView}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      swipeEnabled={false}
      renderTabBar={() => {
        return (
          <View style={styles.tabBar}>
            {routes.map((route, i) => {
              const active = index === i;
              return (
                <TouchableOpacity
                  style={[
                    styles.tab,
                    {width: 100 / routes.length + '%'},
                    active ? styles.activeTab : {},
                  ]}
                  key={route.key}
                  onPress={() => setIndex(i)}>
                  <MaterialIcons
                    name={route.key}
                    size={32}
                    color={active ? colors.primary : colors.onSurfaceDisabled}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
      initialLayout={{width: layout.width}}
    />
  );
};

export default CatTabView;
