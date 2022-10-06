import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
  },
  statusContainer: {
    flexDirection: 'row',
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
