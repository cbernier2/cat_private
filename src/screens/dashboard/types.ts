import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {ReactNode} from 'react';
import {CatTextWithIconType} from '../../components/text-with-icon/types';
import {CatSiteSummary} from '../../redux/site/helpers/transformSiteSummary';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type CatSummaryCardType = {
  title: CatTextWithIconType;
  hasError: boolean;
  summary: CatSiteSummary;
  onPress: () => void;
};

export type CatActiveItemsSectionType = {
  title: string;
  children: ReactNode;
};
