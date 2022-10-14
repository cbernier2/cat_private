import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';

import CatScreen from '../../components/screen';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {BarChart} from '../../components/graphs/bar-chart/Component';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';
import {offlineQueueTest, offlineCancelTest} from '../../redux/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import useCatTheme from '../../hooks/useCatTheme';
import {CatTimePicker} from '../../components/pickers/time/Component';
import {CatDatePicker} from '../../components/pickers/date/Component';

import {DashboardScreenType} from './types';

const DashboardScreen: React.FC<DashboardScreenType> = props => {
  const dispatch = useCatDispatch();
  const {colors} = useCatTheme();
  const {t} = useTranslation();
  const actionQueue = useCatSelector(state => state.network.actionQueue);

  const [inputDate, setInputDate] = useState<Date | undefined>(undefined);
  const username = useCatSelector(userNameSelector);

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
      <ScrollView>
        {/* Thanks to global augmentations IDEs should be able to autocomplete
          with custom things defined in the theme and TS shouldn't complain either */}
        <CatText style={{color: colors.errorCaution100}}>
          {'user name: ' + username}
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
            <CatText variant="headlineMedium">Card title</CatText>
            <CatText>Card content</CatText>
          </Card.Content>
        </Card>
        <BarChart />

        <CatTimePicker onSelect={console.log} />
        <CatDatePicker onSelect={console.log} />

        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={inputDate}
          onChange={d => setInputDate(d)}
          inputMode="end"
          // mode="outlined" (see react-native-paper docs)
          // calendarIcon="calendar" // optional, default is "calendar"
          // other react native TextInput props
        />
      </ScrollView>
    </CatScreen>
  );
};

export default DashboardScreen;
