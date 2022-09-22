import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

const base = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

// Expand/overwrite default light theme and export
export const lightTheme = {
  ...base,
  dark: false,
  roundness: 10,
  colors: {
    ...base.colors,
    primary: '#ccff00',
  },
};
