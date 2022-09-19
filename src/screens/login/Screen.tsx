import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {LoginScreenType} from './types';

const LoginScreen: React.FC<LoginScreenType> = ({navigation}) => {
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <CatScreen>
      <View style={styles.container}>
        <CatText>{'login screen'}</CatText>
        <CatButton title={'Go to Dashboard'} onPress={goToDashboard} />
      </View>
    </CatScreen>
  );
};

export default LoginScreen;
