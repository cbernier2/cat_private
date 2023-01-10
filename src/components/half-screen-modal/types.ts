import React from 'react';
import {ViewStyle} from 'react-native';

export interface HalfScreenModalType {
  children: React.ReactNode;
  ratio?: number;
  visible: boolean;
  onDismiss: () => void;
  contentStyle?: ViewStyle;
}
