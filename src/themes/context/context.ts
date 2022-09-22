import React from 'react';
import {ThemePreferencesContextInterface} from './interface';
import {darkTheme} from '../darkTheme';

export const ThemePreferencesContext =
  React.createContext<ThemePreferencesContextInterface>({
    isThemeDark: true,
    theme: darkTheme, // TODO default theme based on: user data > device preferences?
    toggleTheme: () => {},
  });
