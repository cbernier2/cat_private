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
    productionRow: {
      marginBottom: 16,
    },
    valuesRowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    valuesRowText: {
      fontWeight: 'bold',
    },
    cardContainer: {
      width: 220,
      padding: 16,
      borderRadius: 16,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cardContainerError: {
      borderWidth: 1,
      borderColor: colors.error,
    },
    cardTitle: {
      marginBottom: 24,
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
