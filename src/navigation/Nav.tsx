import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LoginScreen} from '../screens/login';
import {DashboardScreen} from '../screens/dashboard';
import {NavigationContainer} from '@react-navigation/native';
import CatDrawer from './drawer';
import CatHeader from './header';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemePreferencesContext, useThemePreferences} from '../themes';

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
  const {theme, preferences} = useThemePreferences();

  return (
    <ThemePreferencesContext.Provider value={preferences}>
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
    </ThemePreferencesContext.Provider>
  );
};

export default CatNavigation;
