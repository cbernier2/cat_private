import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';
import {BarChart} from '../../components/graphs/bar-chart/Component';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';
import {offlineQueueTest, offlineCancelTest} from '../../redux/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {Card, Paragraph, Title} from 'react-native-paper';
import useCatTheme from '../../hooks/useCatTheme';
import {useTranslation} from 'react-i18next';

const DashboardScreen: React.FC<DashboardScreenType> = props => {
  const dispatch = useCatDispatch();
  const {colors} = useCatTheme();
  const {t} = useTranslation();
  const actionQueue = useCatSelector(state => state.network.actionQueue);

  const userName = useCatSelector(userNameSelector);

  const goToLogin = () => {
    props.navigation.navigate('Login');
  };

  // hardcoded PO actions, since thunks seem to have some issues being set into the queue
  const cancel = async () => {
    await dispatch(offlineCancelTest());
    props.navigation.navigate('Dashboard');
  };

  const queue = async () => {
    await dispatch(offlineQueueTest());
    props.navigation.navigate('Dashboard');
  };

  console.log(JSON.stringify(actionQueue));

  return (
    <CatScreen title={t('summary_title')}>
      <View>
        {/* Thanks to global augmentations IDEs should be able to autocomplete
          with custom things defined in the theme and TS shouldn't complain either */}
        <CatText style={{color: colors.errorCaution100}}>
          {'user name: ' + userName}
        </CatText>
        <CatButton onPress={goToLogin}>Go to Login</CatButton>
        <CatButton onPress={queue}>Queue a thing</CatButton>
        <CatButton onPress={cancel}>Cancel queue</CatButton>

        <CatText>{JSON.stringify(actionQueue)}</CatText>

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
        <BarChart />
      </View>
    </CatScreen>
  );
};

export default DashboardScreen;
