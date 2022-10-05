import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoginScreen} from '../screens/login';
import {DashboardScreen} from '../screens/dashboard';
import {NavigationContainer} from '@react-navigation/native';
import CatDrawer from './drawer';
import CatHeader from './header';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import useCatSelector from '../hooks/useCatSelector';
import {themeSelector} from '../redux/app-selectors';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

const CatNavigation = () => {
  const theme = useCatSelector(themeSelector);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          drawerContent={props => <CatDrawer {...props} />}
          screenOptions={{
            headerTintColor: theme.colors.onSurface,
            headerTitle: props => <CatHeader {...props} />,
          }}>
          <Drawer.Screen name={'Tab Navigator'} component={TabNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default CatNavigation;
