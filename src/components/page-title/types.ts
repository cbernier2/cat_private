import React from 'react';
import {MinestarIconName} from '../minestar-icon/types';

export interface PageTitleType {
  icon: MinestarIconName | React.ReactNode;
  onBack?: () => void;
  title: string | undefined;
}
