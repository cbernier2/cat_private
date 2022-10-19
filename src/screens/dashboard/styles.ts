import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  siteNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  productionContainer: {
    margin: 16,
  },
  textWithLabelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valuesRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContainer: {
    width: 200,
    padding: 16,
    borderRadius: 16,
  },
});

export default styles;
