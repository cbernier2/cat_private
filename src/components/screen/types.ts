import {ComponentProps, ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native';

export type CatScreenType = {
  children: ReactNode;
  title?: string;
  style?: ViewStyle;
  scroll?: boolean;
  safeAreaEdges?: ComponentProps<typeof SafeAreaView>['edges'];
};
