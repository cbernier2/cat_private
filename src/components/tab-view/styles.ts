import {StyleSheet} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';
import {useMemo} from 'react';

export const useStyles = () => {
  const {colors} = useCatTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        tabView: {
          flexGrow: 1,
        },
        tabBar: {
          flexDirection: 'row',
        },
        tab: {
          alignItems: 'center',
          padding: 12,
          paddingTop: 12,
        },
        activeTab: {
          borderBottomWidth: 3,
          paddingBottom: 9,
          borderColor: colors.secondary,
        },
      }),
    [colors],
  );
};
