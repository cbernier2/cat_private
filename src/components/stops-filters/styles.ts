import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';

export const useStyles = () => {
  const {colors} = useCatTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
        },
        spacer: {
          width: 4,
        },
        toggleButton: {
          borderWidth: 1,
          marginRight: 4,
        },
        toggleButtonLast: {
          marginRight: 0,
        },
        toggleButtonSelected: {
          borderWidth: 0,
          backgroundColor: colors.primary,
        },
      }),
    [colors],
  );
};
