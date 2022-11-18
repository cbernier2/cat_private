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
    marginTop: 12,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  cardItem: {
    width: '50%',
  },
  areaText: {
    marginRight: 8,
    marginLeft: 8,
    flexShrink: 1,
    alignSelf: 'center',
  },
  equipTitle: {
    marginTop: 20,
  },
});

export default styles;
