import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type CatScreenType = {
  children: ReactNode;
  title?: string;
  style?: ViewStyle;
  scroll?: boolean;
};
