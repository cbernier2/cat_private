import {NativeModules} from 'react-native';

jest.mock('react-native-localize', () => {
  return {
    getLocales: jest.fn(),
    findBestAvailableLanguage: () => 'en',
  };
});
import '../src/locales';

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      getParent: jest.fn(),
    }),
    useFocusEffect: () => {},
  };
});

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

jest.mock('react-native-paper');
