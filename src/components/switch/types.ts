import {ComponentProps} from 'react';
import {Switch} from 'react-native-paper';

export type CatSwitchType = ComponentProps<typeof Switch> & {
  label: string;
};
