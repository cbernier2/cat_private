import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  titleIcon: {
    marginHorizontal: 16,
  },
  titleText: {
    flexShrink: 1,
  },
  productionContainer: {
    margin: 16,
  },
  kpiRow: {
    marginBottom: 16,
  },
  cardsContainer: {
    marginVertical: 12,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginVertical: 4,
  },
  cardItem: {
    width: '50%',
  },
  areaText: {
    marginRight: 8,
    flexShrink: 1,
  },
  areaIconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'black',
  },
});

export default styles;
