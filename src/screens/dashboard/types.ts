import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import {CatTextWithIconType} from '../../components/text-with-icon/types';
import {Summary} from '../../api/types/cat/production';
import {UnitType} from '../../api/types/cat/common';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatValuesRowType = {
  style?: ViewStyle;
  values: CatTextWithLabelType[];
};

export type CatSummaryCardType = {
  title: CatTextWithIconType;
  hasError: boolean;
  summary: Summary;
  unitType: UnitType;
};

export type CatActiveItemsSectionType = {
  title: string;
  children: ReactNode;
};
