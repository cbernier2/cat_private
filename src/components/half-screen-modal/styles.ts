import {StyleSheet} from 'react-native';

import useCatTheme from '../../hooks/useCatTheme';
import {useMemo} from 'react';

export const useStyles = (ratio: number) => {
  const {colors} = useCatTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        contentContainer: {
          backgroundColor: colors.surface,
          position: 'absolute',
          top: `${ratio * 100}%`,
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      }),
    [ratio, colors],
  );
};
