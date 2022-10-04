import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {MD3DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {fonts} from './fonts';

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
  version: 3,
  fonts: {
    ...base.fonts,
    ...fonts,
  },
  colors: {
    ...base.colors,

    // Like for fonts, not all MD3 colors seem to be covered in the UI Kit provided
    //   https://github.com/callstack/react-native-paper/blob/v5.0.0-rc.6/src/styles/themes/v3/LightTheme.tsx#L12
    primary: '#FC0',
    onPrimary: '#FAFBFE',
    primaryContainer: '#000',
    onPrimaryContainer: '#000',

    secondary: '#0288D1',
    onSecondary: '#FAFBFE',
    secondaryContainer: '#03A9F4',
    onSecondaryContainer: '#FAFBFE',

    tertiary: '#08CB36',
    onTertiary: '#FAFBFE',

    // custom values, matching what's in the UI Kit which have no MD3 match
    errorCaution0: '#FF7C00',
    errorCaution100: 'rgba(255, 124, 0, 0.8)',
    errorWarning0: '#D32F2F',
    errorWarning100: 'rgba(211, 47, 47, 0.8)',

    // onBackground and onSurface don't make much sense since `on*` is "text over *" for MD3
    //  and according to the UI Kit, we want almost black on black...
    background: '#12171C',
    onBackground: '#191E23',

    surface: '#262B30',
    onSurface: '#32373C',

    elevation: {
      level0: 'transparent',
      level1: '#21262B',
      level2: '#262B30',
      level3: '#32373C',
      level4: '#4B5055',
      level5: '#64696E',
    },
  },
};
