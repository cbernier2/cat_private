import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {MD3LightTheme as PaperLightTheme} from 'react-native-paper';
import {fonts} from './fonts';

const base = {
  ...NavigationDefaultTheme,
  ...PaperLightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperLightTheme.colors,
  },
};

// Expand/overwrite default light theme and export
export const lightTheme = {
  ...base,
  dark: false,
  roundness: 10,
  version: 3,
  fonts: {
    ...base.fonts,
    ...fonts,
  },
  colors: {
    ...base.colors,
    primary: '#ccff00',
  },
};
