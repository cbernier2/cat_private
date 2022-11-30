import React from 'react';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';

export type ScreenType = StackScreenProps<any> & {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatRouteItemType = {
  icon: React.ReactNode;
  name?: string;
  onPress?: () => void;
  children: React.ReactNode;
};
