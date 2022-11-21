import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user/user-slice';
import app, {offlineQueueTest} from './app/app-slice';
import sitesList from './sites-list/sites-slice';
import site, {fetchSiteAsyncAction} from './site/site-slice';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {catApi} from './site/api';
import {networkTransform} from '../utils/offline';

const combinedReducer = combineReducers({
  user,
  app,
  network,
  site,
  sitesList,
  [catApi.reducerPath]: catApi.reducer,
});

export const rootReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['user', 'app', 'site', 'sitesList', catApi.reducerPath],
    transforms: [networkTransform({offlineQueueTest})],
  },
  combinedReducer,
);

const networkMiddleware = createNetworkMiddleware({
  actionTypes: ['app/offlineQueueTest', fetchSiteAsyncAction.typePrefix],
  queueReleaseThrottle: 200,
});

export const store = configureStore({
  reducer: rootReducer as typeof combinedReducer,
  middleware: getDefaultMiddleware => [
    networkMiddleware,
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    thunk,
    catApi.middleware,
  ],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
