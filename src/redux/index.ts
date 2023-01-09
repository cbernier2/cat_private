import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user/user-slice';
import app, {offlineQueueTest} from './app/app-slice';
import sitesList, {selectSiteAsyncAction} from './sites-list/sites-slice';
import site, {fetchSiteAsyncAction} from './site/site-slice';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import {catApi} from './site/api';
import {sitesApi} from './sites-list/api';
import {networkTransform} from '../utils/offline';
import {catPersistReducer} from './utils';

const combinedReducer = combineReducers({
  user,
  app,
  network,
  site,
  sitesList,
  [catApi.reducerPath]: catApi.reducer,
  [sitesApi.reducerPath]: sitesApi.reducer,
});

export const rootReducer = catPersistReducer(
  {
    key: 'root',
    blacklist: [
      'user',
      'app',
      'site',
      'sitesList',
      catApi.reducerPath,
      sitesApi.reducerPath,
    ],
    transforms: [networkTransform({offlineQueueTest})],
  },
  combinedReducer,
);

const networkMiddleware = createNetworkMiddleware({
  actionTypes: [
    'app/offlineQueueTest', // TODO Cleanup tests
    fetchSiteAsyncAction.typePrefix,
    selectSiteAsyncAction.typePrefix,
  ],
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
    sitesApi.middleware,
  ],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
