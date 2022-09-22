import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatButton from '../../components/button';
// import CatCard from '../../components/card';
import {DashboardScreenType} from './types';
import {Card, Paragraph, Title} from 'react-native-paper';

const DashboardScreen: React.FC<DashboardScreenType> = ({navigation}) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <CatScreen>
      <View>
        <CatText>{'dashboard screen'}</CatText>
        <CatButton onPress={goToLogin}>Go to Login</CatButton>

        <CatButton disabled>Disabled</CatButton>

        <Card
          mode="outlined"
          onPress={() => {
            console.log('go somewhere!');
          }}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </CatScreen>
  );
};

export default DashboardScreen;
