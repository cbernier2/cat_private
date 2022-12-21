import {ComponentProps} from 'react';
import DropDown from 'react-native-paper-dropdown';
import {Optional} from 'utility-types';

export type CatDropDownType = Optional<
  ComponentProps<typeof DropDown>,
  'visible' | 'showDropDown' | 'onDismiss'
  >;
