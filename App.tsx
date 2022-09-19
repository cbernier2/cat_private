import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoginScreen} from './src/screens/login';
import {DashboardScreen} from './src/screens/dashboard';
import CatDrawer from './src/components/drawer';
import CatHeader from './src/components/header';

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

const App = () => {
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

export default App;
