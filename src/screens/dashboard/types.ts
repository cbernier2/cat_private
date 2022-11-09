import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {ReactNode} from 'react';
import {CatTextWithIconType} from '../../components/text-with-icon/types';
import {Summary} from '../../api/types/cat/production';
import {UnitType} from '../../api/types/cat/common';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatSummaryCardType = {
  title: CatTextWithIconType;
  hasError: boolean;
  summary: Summary;
  unitType: UnitType;
  onPress: () => void;
};

export type CatActiveItemsSectionType = {
  title: string;
  children: ReactNode;
};
