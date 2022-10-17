import {StyleSheet} from 'react-native';

import useCatTheme from '../../hooks/useCatTheme';

export const useStyles = () => {
  const theme = useCatTheme();

  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.errorContainer,
      marginBottom: 20,
    },
    cardContent: {
      color: theme.colors.onErrorContainer,
    },
  });
};
