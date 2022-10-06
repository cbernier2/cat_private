import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 100,
    backgroundColor: 'red',
  },
  lastUpdateContainer: {},
  statusIconContainer: {},
});

export default styles;
