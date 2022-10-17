import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from '../screens/login';
import {DashboardScreen} from '../screens/dashboard';
import useCatTheme from '../hooks/useCatTheme';
import useCatSelector from '../hooks/useCatSelector';
import {userAuthTokenSelector} from '../redux/user-selectors';

import CatDrawer from './drawer';
import CatHeader from './header';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

const CatNavigation = () => {
  const theme = useCatTheme();
  const userToken = useCatSelector(userAuthTokenSelector);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {userToken === null ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={LoginScreen} name="login" />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator
            drawerContent={props => <CatDrawer {...props} />}
            screenOptions={{
              headerTintColor: theme.colors.onSurface,
              headerTitle: props => <CatHeader {...props} />,
            }}>
            <Drawer.Screen name={'Tab Navigator'} component={TabNavigator} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default CatNavigation;
