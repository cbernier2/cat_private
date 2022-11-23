import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import React from 'react';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatRouteItemType = {
  icon: React.ReactNode;
  name?: string;
  children: React.ReactNode;
};
