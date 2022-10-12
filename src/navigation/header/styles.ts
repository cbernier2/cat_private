import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  statusTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusTitle: {
    textTransform: 'uppercase',
    fontSize: 8,
  },
  statusDate: {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Roboto-Medium',
  },
  statusIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
