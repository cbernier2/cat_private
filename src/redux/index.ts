import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './user-slice';
import app from './app-slice';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({user, app});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
