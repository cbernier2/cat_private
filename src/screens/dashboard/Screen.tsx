import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';

const DashboardScreen: React.FC<DashboardScreenType> = ({navigation}) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <CatScreen>
      <View style={styles.container}>
        <CatText>{'dashboard screen'}</CatText>
        <CatButton title={'Go to Login'} onPress={goToLogin} />
      </View>
    </CatScreen>
  );
};

export default DashboardScreen;
