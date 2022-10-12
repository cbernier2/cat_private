import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/login';
import {DashboardScreen} from '../screens/dashboard';
import {NavigationContainer} from '@react-navigation/native';
import CatDrawer from './drawer';
import CatHeader from './header';
import React, {ComponentProps} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import useCatTheme from '../hooks/useCatTheme';
import {SiteStopsScreen} from '../screens/site-stops';
import {SearchScreen} from '../screens/search';
import CatTabBarIcon from './tab-bar-icon';

const SummaryStack = createStackNavigator();
const SummaryNavigator = () => (
  <SummaryStack.Navigator screenOptions={{headerShown: false}}>
    <SummaryStack.Screen name="Dashboard" component={DashboardScreen} />
  </SummaryStack.Navigator>
);

const SiteStopsStack = createStackNavigator();
const SiteStopsNavigator = () => (
  <SiteStopsStack.Navigator screenOptions={{headerShown: false}}>
    <SiteStopsStack.Screen name="SiteStops" component={SiteStopsScreen} />
  </SiteStopsStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchNavigator = () => (
  <SearchStack.Navigator screenOptions={{headerShown: false}}>
    <SearchStack.Screen name="Search" component={SearchScreen} />
  </SearchStack.Navigator>
);

const Tab = createBottomTabNavigator();
const createTabScreen = (
  props: ComponentProps<typeof Tab.Screen>,
  iconName: string,
) =>
  React.createElement(Tab.Screen, {
    ...props,
    options: {
      tabBarIcon: ({focused}) => (
        <CatTabBarIcon focused={focused} iconName={iconName} />
      ),
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 56,
      },
    },
  });
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        headerShown: false,
      }}>
      {createTabScreen(
        {
          name: 'SummaryTab',
          component: SummaryNavigator,
        },
        'apps',
      )}
      {createTabScreen(
        {
          name: 'SiteStopsTab',
          component: SiteStopsNavigator,
        },
        'access-time',
      )}
      {createTabScreen(
        {
          name: 'SearchTab',
          component: SearchNavigator,
        },
        'search',
      )}
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const theme = useCatTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CatDrawer {...props} />}
      screenOptions={{
        headerTintColor: theme.colors.onSurface,
        headerTitle: props => <CatHeader {...props} />,
      }}>
      <Drawer.Screen name={'DrawerNavigator'} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const MainStack = createStackNavigator();
const CatNavigation = () => {
  const theme = useCatTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen
            name={'ConnectedNavigator'}
            component={DrawerNavigator}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default CatNavigation;
