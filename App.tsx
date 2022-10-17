import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {ReduxNetworkProvider} from 'react-native-offline';

import CatNavigation from './src/navigation';
import {persistor, store} from './src/redux';
import useCatSelector from './src/hooks/useCatSelector';
import {emulateOfflineSelector} from './src/redux/app-selectors';
import './src/locales';

const App = () => {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
};

const InnerApp = () => {
  const isEmulatingOffline = useCatSelector(emulateOfflineSelector);
  const offlineUrl = 'https://www.a.ca';
  const onlineUrl = 'https://www.google.com';

  return (
    <ReduxNetworkProvider
      pingServerUrl={isEmulatingOffline ? offlineUrl : onlineUrl}
      pingInterval={100}
      httpMethod={'HEAD'}
      pingInBackground={true}
      pingOnlyIfOffline={false}
      pingTimeout={1000}
      shouldPing={true}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CatNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </ReduxNetworkProvider>
  );
};

export default App;
