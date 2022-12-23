import {ComponentProps} from 'react';
import {TimePickerModal} from 'react-native-paper-dates';

export type CatTimePickerType = ComponentProps<typeof TimePickerModal>;

export interface CatTimePickerSelection {
  hours: number;
  minutes: number;
}
