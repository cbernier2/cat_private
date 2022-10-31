import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user-slice';
import app, {offlineQueueTest} from './app-slice';
import sites from './sites/sites-slice';
import {createTransform, persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {catApi} from './sites/api';

const offlineActions = {offlineQueueTest};

export const rootReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['user', 'app', 'sites', catApi.reducerPath],
    transforms: [
      createTransform(
        (inboundState: any) => {
          const actionQueue: any[] = [];
          console.log('inbound', JSON.stringify(inboundState));

          inboundState.actionQueue.forEach((action: any) => {
            if (typeof action === 'function') {
              actionQueue.push({
                function: action.meta.name,
                args: action.meta.args,
              });
            } else if (typeof action === 'object') {
              actionQueue.push(action);
            }
          });

          return {
            ...inboundState,
            actionQueue,
          };
        },
        (outboundState: any) => {
          const actionQueue: any[] = [];
          console.log('outbound', JSON.stringify(outboundState));

          outboundState.actionQueue.forEach((action: any) => {
            if (action.function) {
              // @ts-ignore
              const actionFunction = offlineActions[action.function];
              actionQueue.push(actionFunction(...action.args));
            } else {
              actionQueue.push(action);
            }
          });

          return {...outboundState, actionQueue};
        },
        {whitelist: ['network']},
      ),
    ],
  },
  combineReducers({
    user,
    app,
    network,
    sites,
    [catApi.reducerPath]: catApi.reducer,
  }),
);

const networkMiddleware = createNetworkMiddleware({
  actionTypes: ['app/offlineQueueTest'],
  queueReleaseThrottle: 200,
});

export const store = configureStore({
  reducer: rootReducer,
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
