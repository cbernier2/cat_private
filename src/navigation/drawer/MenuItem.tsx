import {Drawer} from 'react-native-paper';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {MenuItemType} from './types';

export const CatMenuItem = ({label, onPress, icon}: MenuItemType) => {
  return (
    <Drawer.Item
      style={styles.menuItemContainer}
      onPress={onPress}
      label={label}
      icon={({size, color}) =>
        icon && <MaterialIcons name={icon} size={size} color={color} />
      }
    />
  );
};
