import {Drawer} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {MenuItemType} from './types';
import {useStyles} from './styles';

export const CatMenuItem = ({label, onPress, icon}: MenuItemType) => {
  const styles = useStyles();

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
