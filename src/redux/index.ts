import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user-slice';
import app, {offlineQueueTest} from './app-slice';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {networkTransform} from '../utils/offline';

const reducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    transforms: [networkTransform({offlineQueueTest})],
  },
  combineReducers({user, app, network}),
);

const networkMiddleware = createNetworkMiddleware({
  actionTypes: ['app/offlineQueueTest'],
  queueReleaseThrottle: 200,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    [
      networkMiddleware,
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    ].concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
