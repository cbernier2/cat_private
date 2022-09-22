import React from 'react';

import {darkTheme} from './darkTheme';
import {lightTheme} from './lightTheme';

export const useThemePreferences = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(true);

  let theme = isThemeDark ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      isThemeDark,
      theme,
      toggleTheme,
    }),
    [toggleTheme, isThemeDark],
  );

  return {
    preferences,
    theme,
  };
};
