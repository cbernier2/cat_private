import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

import {
  CatAreaSummary,
  CatEquipmentSummary,
  CatRouteSummary,
} from '../../redux/site/helpers/transformSummaries';

export type ScreenType = {
  navigation: MaterialBottomTabNavigationProp<any>;
};

export type SearchItem = (
  | CatAreaSummary
  | CatEquipmentSummary
  | CatRouteSummary
) & {label: string};
