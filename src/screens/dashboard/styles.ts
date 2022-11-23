import {StyleSheet} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';

export const useStyles = () => {
  const {colors} = useCatTheme();

  return StyleSheet.create({
    siteNameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 16,
    },
    productionContainer: {
      margin: 16,
    },
    activeWorkTitle: {
      marginHorizontal: 16,
    },
    kpiRow: {
      marginBottom: 16,
    },
    cardContainer: {
      width: 250,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cardContainerError: {
      borderWidth: 1,
      borderColor: colors.error,
    },
    cardTitle: {
      marginBottom: 24,
      paddingRight: 12,
      minHeight: 50,
    },
    cardRowsSpacer: {
      height: 8,
    },
    activeProductionItemsHeader: {
      marginHorizontal: 16,
      marginVertical: 8,
    },
    activeProductionItem: {
      margin: 6,
    },
  });
};
