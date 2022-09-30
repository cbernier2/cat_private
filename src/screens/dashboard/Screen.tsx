import React from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {DashboardScreenType} from './types';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';
// import {offlineQueueTest, offlineCancelTest} from '../../redux/app-slice';
import useCatDispatch from '../../hooks/useCatDispatch';
import {connect} from 'react-redux';

const DashboardScreen: React.FC<DashboardScreenType> = props => {
  const dispatch = useCatDispatch();
  const userName = useCatSelector(userNameSelector);

  const goToLogin = () => {
    props.navigation.navigate('Login');
  };

  // hardcoded PO actions, since thunks seem to have some issues being set into the queue
  const cancel = async () => {
    // await dispatch(offlineCancelTest());
    dispatch({type: 'app/offlineCancelTest'});
    props.navigation.navigate('Dashboard');
  };

  const queue = async () => {
    // await dispatch(offlineQueueTest());
    dispatch({
      type: 'app/offlineQueueTest',
      payload: {test: true},
      meta: {
        retry: true,
        // Which action type(s) will remove this action from the queue
        //  We were wondering on if/how we can store posts for multiple users
        //  If we can't, we can clear them on logout by adding the logout action here
        dismiss: ['app/offlineCancelTest'],
      },
    });
    props.navigation.navigate('Dashboard');
  };

  console.log(JSON.stringify(props.queue));

  return (
    <CatScreen title={'dashboard'}>
      <View style={styles.container}>
        <CatText>{'user name: ' + userName}</CatText>
        <CatButton title={'Go to Login'} onPress={goToLogin} />
        <CatButton title={'Queue a thing'} onPress={queue} />
        <CatButton title={'Cancel queue'} onPress={cancel} />

        <CatText>{JSON.stringify(props.queue)}</CatText>
      </View>
    </CatScreen>
  );
};

const mapStateToProps = (state: any) => ({
  queue: state.network.actionQueue,
});

export default connect(mapStateToProps)(DashboardScreen);
