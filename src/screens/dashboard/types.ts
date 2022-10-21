import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {units} from 'minestar-units';
import {CatTextWithLabelType} from '../../components/text-with-label/types';
import {CatTextWithIconType} from '../../components/text-with-icon/types';

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
  total: number;
  projected: number;
  target: number;
  unit: units.Unit;
};

export type CatActiveItemsSectionType = {
  title: string;
  children: ReactNode;
};
