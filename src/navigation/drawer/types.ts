import {DrawerContentComponentProps} from '@react-navigation/drawer/src/types';

export type CatDrawerType = DrawerContentComponentProps & {};

export type MenuItemType = {
  label: string;
  onPress?: () => void;
  icon?: string;
};

export type ExternalLinkType = Omit<MenuItemType, 'onPress'> & {
  url: string;
};
