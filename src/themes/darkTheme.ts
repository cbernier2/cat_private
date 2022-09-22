import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';

const base = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

// Expand/overwrite default dark theme and export
export const darkTheme = {
  ...base,
  dark: true,
  roundness: 10,
  colors: {
    ...base.colors,
    primary: '#ffcc00',
  },
};
