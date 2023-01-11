import {ComponentProps} from 'react';
import {ViewStyle} from 'react-native';
import CatTextInput from '../text-input';
import {CatSelectListValueType} from '../select-list/types';

export interface CatDropDownType {
  value: CatSelectListValueType;
  setValue: (_value: CatSelectListValueType) => void;
  label: string;
  list: {
    value: any;
    label: string;
  }[];
  visible?: boolean;
  onDismiss?: () => void;
  showDropDown?: () => void;
  accessibilityLabel?: string;
  placeholder?: string | undefined;
  dropDownStyle?: ViewStyle;
  inputProps?: ComponentProps<typeof CatTextInput>;
}
