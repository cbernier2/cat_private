import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';
import {Card, Paragraph, Title} from 'react-native-paper';
import useCatTheme from '../../hooks/useCatTheme';

const DashboardScreen: React.FC<DashboardScreenType> = ({navigation}) => {
  const {colors} = useCatTheme();

  const userName = useCatSelector(userNameSelector);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <CatScreen title={'dashboard'}>
      <View>
        {/* Thanks to global augmentations IDEs should be able to autocomplete
          with custom things defined in the theme and TS shouldn't complain either */}
        <CatText style={{color: colors.errorCaution100}}>
          {'user name: ' + userName}
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
