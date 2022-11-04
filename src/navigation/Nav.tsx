import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/login';
import {SitesListScreen} from '../screens/sites-list';
import {DashboardScreen} from '../screens/dashboard';
import useCatTheme from '../hooks/useCatTheme';
import {SiteStopsScreen} from '../screens/site-stops';
import {SearchScreen} from '../screens/search';
import DebugScreen from '../screens/debug/Screen';
import useCatSelector from '../hooks/useCatSelector';
import {userAuthTokenSelector} from '../redux/user-selectors';
import {sitesSelectedSiteSelector} from '../redux/sites/sites-selectors';

import CatDrawer from './drawer';
import CatDrawerIcon from './header/DrawerIcon';
import CatHeader from './header';
import CatSyncStatus from './header/SyncStatus';

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

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={'Dashboard'} labeled={false}>
      <Tab.Screen
        name={'SummaryTab'}
        component={SummaryNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="apps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={'SiteStopsTab'}
        component={SiteStopsNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="access-time" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={'SearchTab'}
        component={SearchNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const {colors} = useCatTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CatDrawer {...props} />}
      screenOptions={{
        headerTintColor: colors.onSurface,
        headerTitle: props => <CatHeader {...props} />,
        headerTitleAlign: 'left',
        headerRight: () => <CatSyncStatus />,
        headerLeft: () => <CatDrawerIcon />,
      }}>
      <Drawer.Screen name={'TabNavigator'} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const MainStack = createStackNavigator();
const CatNavigation = () => {
  const theme = useCatTheme();
  const {t} = useTranslation();
  const userToken = useCatSelector(userAuthTokenSelector);
  const selectedSite = useCatSelector(sitesSelectedSiteSelector);
  //console.log('Nav', JSON.stringify({userToken, selectedSite}));

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          {userToken === null ? (
            <MainStack.Screen name="Login" component={LoginScreen} />
          ) : selectedSite === null ? (
            <MainStack.Screen
              name="SitesList"
              component={SitesListScreen}
              initialParams={{root: true}}
            />
          ) : (
            <>
              <MainStack.Screen
                name={'ConnectedNavigator'}
                component={DrawerNavigator}
              />
              <MainStack.Screen
                name={'SwitchSite'}
                component={SitesListScreen}
                options={{
                  headerShown: true,
                  headerTitle: t('side_menu_switch_site'),
                  presentation: 'modal',
                }}
              />
            </>
          )}
          <MainStack.Screen
            name={'Debug'}
            component={DebugScreen}
            options={{headerShown: true, presentation: 'modal'}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default CatNavigation;
