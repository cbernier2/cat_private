import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import React, {ComponentProps, ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import {ColorValue, ViewStyle} from 'react-native';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatTextWithIconType = ComponentProps<typeof Text> & {
  icon: React.FC<SvgProps>;
  iconColor?: ColorValue;
};

export type CatTextWithLabelType = ComponentProps<typeof Text> & {
  label: string;
  isPrimary?: boolean;
  isDown?: boolean;
};

export type CatValuesRowType = {
  style?: ViewStyle;
  values: CatTextWithLabelType[];
};

export type CatSummaryCardType = {
  title: CatTextWithIconType;
  row1: CatValuesRowType;
  row2: CatValuesRowType;
  hasError?: boolean;
};

export type CatActiveItemsSectionType = {
  title: string;
  children: ReactNode;
};

export type CatAccordionType = {
  children: ReactNode;
};
