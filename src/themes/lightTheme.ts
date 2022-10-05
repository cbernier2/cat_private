import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {MD3LightTheme as PaperLightTheme} from 'react-native-paper';
import {fonts} from './fonts';
import {darkTheme} from './darkTheme';

const base = {
  ...NavigationDefaultTheme,
  ...PaperLightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperLightTheme.colors,
  },
};

// Expand/overwrite default light theme and export
export const lightTheme: typeof darkTheme = {
  ...darkTheme,
  ...base,
  dark: false,
  roundness: 10,
  version: 3,
  fonts: {
    ...darkTheme.fonts,
    ...base.fonts,
    ...fonts,
  },
  colors: {
    ...darkTheme.colors,
    ...base.colors,
    primary: '#ccff00',
  },
};
