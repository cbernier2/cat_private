import React, {useState} from 'react';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import CatButton from '../../components/button';
import {LoginScreenType} from './types';
import CatTextInput from '../../components/text-input';
import useCatSelector from '../../hooks/useCatSelector';
import {userNameSelector} from '../../redux/user-selectors';
import {loginAsyncAction} from '../../redux/user-slice';
import useCatDispatch from '../../hooks/useCatDispatch';

const LoginScreen: React.FC<LoginScreenType> = ({navigation}) => {
  const dispatch = useCatDispatch();
  const [userName, setUserName] = useState(useCatSelector(userNameSelector));
  const [password, setPassword] = useState('');
  const isLogin = useCatSelector(state => state.user.isLogin);

  const login = async () => {
    await dispatch(loginAsyncAction({password, userName}));
    navigation.navigate('Dashboard');
  };

  return (
    <CatScreen>
      <View style={styles.container}>
        <CatText>{'Name: '}</CatText>
        <CatTextInput
          value={userName}
          onChangeText={value => setUserName(value)}
        />
        <CatText>{'Password: '}</CatText>
        <CatTextInput
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <CatButton disabled={isLogin} title={'Login'} onPress={login} />
      </View>
    </CatScreen>
  );
};

export default LoginScreen;
