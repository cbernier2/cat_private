import {StyleSheet} from 'react-native';

import useCatTheme from '../../hooks/useCatTheme';

export const useStyles = () => {
  const theme = useCatTheme();

  return StyleSheet.create({
    main: {
      backgroundColor: theme.colors.surface,
      flex: 1,
    },
  });
};
