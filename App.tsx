import React from 'react';
import CatNavigation from './src/navigation';
import {persistor, store} from './src/redux';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {ReduxNetworkProvider} from 'react-native-offline';
// Plain <NetworkProvider /> is required if we want to be able to use the useIsConnected() hook
// We need <ReduxNetworkProvider /> to integrate RNO with redux, which means we don't need
//   <NetworkProvider /> if we don't plan to use the hook.
//   `isConnected` is still accessible via redux' `connect()` and `mapStateToProps()`, in that case

const App = () => {
  return (
    <Provider store={store}>
      {/* Might just be my IDE but TS complains RNP does not have default props, which is false */
      /*@ts-ignore*/}
      <ReduxNetworkProvider
        pingServerUrl={'https://www.google.com'}
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
    </Provider>
  );
};

export default App;
