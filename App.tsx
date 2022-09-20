import React from 'react';
import CatNavigation from './src/navigation';
import {persistor, store} from './src/redux';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CatNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
