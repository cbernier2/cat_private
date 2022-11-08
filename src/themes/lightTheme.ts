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
  fonts: {
    ...darkTheme.fonts,
    ...base.fonts,
    ...fonts,
  },
  colors: {
    ...darkTheme.colors, // Only needed to fix the Typescript error while the Light Theme is not supported
    ...base.colors,
    logoColor: '#000',
    primary: '#ccff00',
  },
};
