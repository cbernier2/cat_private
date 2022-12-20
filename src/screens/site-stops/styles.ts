import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';

export const useStyles = () => {
  const {colors} = useCatTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        tabView: {
          flexGrow: 1,
        },
        addButton: {
          width: 70,
          height: 24,
        },
        addButtonLabel: {
          color: '#000',
          fontSize: 22,
          fontWeight: 'bold',
          marginVertical: 0,
          top: 4,
        },
        headerContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 12,
          marginVertical: 16,
        },
        timeSelectorPageIndicator: {
          flexDirection: 'row',
          marginTop: 8,
        },
        timeSelectorPageBadge: {
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 8,
          backgroundColor: colors.grey30,
        },
        badgeSelected: {
          backgroundColor: colors.grey70,
        },
        filterButtonsContainer: {
          flexDirection: 'row',
        },

        verticalScrollWrapper: {
          flex: 1,
          flexDirection: 'row',
        },
        equipmentList: {
          width: 110,
        },
      }),
    [colors],
  );
};
