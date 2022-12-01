import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';

export type ScreenType = StackScreenProps<any> & {
  navigation: MaterialBottomTabNavigationProp<any>;
};
