import React from 'react';
import {View} from 'react-native';
import {CatTabBarType} from './types';
import styles from './styles';
import useCatTheme from '../../hooks/useCatTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatTabBarIcon: React.FC<CatTabBarType> = ({focused, iconName}) => {
  const {colors} = useCatTheme();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={iconName}
        color={focused ? colors.secondaryContainer : colors.grey50}
        size={32}
      />
    </View>
  );
};

export default CatTabBarIcon;
