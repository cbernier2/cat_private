import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';

const DashboardScreen: React.FC<DashboardScreenType> = ({navigation}) => {
  const userName = useCatSelector(userNameSelector);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <CatScreen>
      <View style={styles.container}>
        <CatText>{'user name: ' + userName}</CatText>
        <CatButton title={'Go to Login'} onPress={goToLogin} />
      </View>
    </CatScreen>
  );
};

export default DashboardScreen;
