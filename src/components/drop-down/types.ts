import {ComponentProps, ReactNode} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import CatTextInput from '../text-input';

export interface CatDropDownType {
  value: any;
  setValue: (_value: any) => void;
  label?: string | undefined;
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
  visible?: boolean;
  multiSelect?: boolean;
  onDismiss?: () => void;
  showDropDown?: () => void;
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  accessibilityLabel?: string;
  placeholder?: string | undefined;
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  inputProps?: ComponentProps<typeof CatTextInput>;
}
