import {ComponentProps} from 'react';
import {TimePickerModal} from 'react-native-paper-dates';

export type CatTimePickerType = Omit<
  ComponentProps<typeof TimePickerModal>,
  'onDismiss' | 'visible'
> & {
  children: any;
};

export interface CatTimePickerSelection {
  hours: number;
  minutes: number;
}
