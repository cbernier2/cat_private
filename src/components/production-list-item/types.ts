import React from 'react';

export type CatProductionListItemType = {
  icon: React.ReactNode;
  name?: string;
  onPress?: () => void;
  children: React.ReactNode;
};
