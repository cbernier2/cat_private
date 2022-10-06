import {describe, it, expect} from '@jest/globals';
import 'react-native';
import React from 'react';
import {LoginScreen} from '../src/screens/login';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../src/redux';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

describe('the login screen', () => {
  it('renders correctly', () => {
    const store = configureStore({reducer: rootReducer});
    const screen = renderer.create(
      <Provider store={store}>
        <LoginScreen navigation={useNavigation()} />
      </Provider>,
    );
    expect(screen.root).not.toBeNull();
  });
});
