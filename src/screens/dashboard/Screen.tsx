import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';
import {Card, Paragraph, Title, useTheme} from 'react-native-paper';

const DashboardScreen: React.FC<DashboardScreenType> = ({navigation}) => {
  // RNP's useTheme() hook does reflect the custom theme
  const theme = useTheme();
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <CatScreen>
      <View>
        {/* Thanks to global augmentations IDEs should be able to autocomplete
          with custom things defined in the theme and TS shouldn't complain either */}
        <CatText style={{color: theme.colors.errorCaution100}}>
          {'dashboard screen'}
        </CatText>
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
