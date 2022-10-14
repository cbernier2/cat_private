import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import useCatTheme from '../../hooks/useCatTheme';

const CatDrawerIcon: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const {colors} = useCatTheme();

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <MaterialIcons
        name={'menu'}
        color={colors.text}
        size={28}
        style={styles.drawerIcon}
      />
    </TouchableOpacity>
  );
};

export default CatDrawerIcon;
