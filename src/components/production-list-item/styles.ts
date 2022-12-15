import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  cardItem: {
    width: '60%',
  },
  areaText: {
    marginRight: 8,
    marginLeft: 8,
    flexShrink: 1,
    alignSelf: 'center',
  },
});

export default styles;
