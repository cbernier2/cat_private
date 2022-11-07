import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

type Part = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Ratio = `${Part}:${Part}`;

export interface HalfScreenModalType extends StackScreenProps<any> {
  children: React.ReactNode;
  ratio?: Ratio;
}
