import React from 'react';

export type CatSelectListValueType = any;

export type CatSelectListItems = {
  label: string;
  value: CatSelectListValueType;
  custom?: React.ReactNode;
}[];

export interface CatSelectListType {
  title: string;
  list: CatSelectListItems;
  value: CatSelectListValueType;
  setValue: (_value: CatSelectListValueType) => void;
  onDismiss?: () => void;
}
