import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {LoginScreenType} from './types';

const LoginScreen: React.FC<LoginScreenType> = ({navigation}) => {
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <CatScreen>
      <View>
        <CatText>{'login screen'}</CatText>
        <CatButton onPress={goToDashboard}>Go to Dashboard</CatButton>
      </View>
    </CatScreen>
  );
};

export default LoginScreen;
