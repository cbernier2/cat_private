import {StyleSheet} from 'react-native';

import useCatTheme from '../../../../../hooks/useCatTheme';

export const useStyles = () => {
  const theme = useCatTheme();

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      paddingBottom: 10,
    },
    labelText: {
      color: theme.colors.grey50,
    },
    unitText: {
      color: theme.colors.onSurface,
      paddingLeft: 10,
      paddingRight: 15,
    },
  });
};
