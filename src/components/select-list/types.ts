import React from 'react';
import {ViewStyle} from 'react-native';

export type CatSelectListValueType = any;

export type CatSelectListItems = {
  label: string | React.ReactNode;
  value: CatSelectListValueType;
}[];

export interface CatSelectListType {
  visible: boolean;
  title: string;
  list: CatSelectListItems;
  value?: CatSelectListValueType;
  setValue: (_value: CatSelectListValueType) => void;
  onDismiss: () => void;
  contentViewStyle?: ViewStyle;
}
