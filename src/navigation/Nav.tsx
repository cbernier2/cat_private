import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoginScreen} from '../screens/login';
import {DashboardScreen} from '../screens/dashboard';
import {NavigationContainer} from '@react-navigation/native';
import CatDrawer from './drawer';
import CatHeader from './header';
import React from 'react';

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
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CatDrawer {...props} />}
        screenOptions={{
          headerTitle: props => <CatHeader {...props} />,
        }}>
        <Drawer.Screen name={'Tab Navigator'} component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default CatNavigation;
