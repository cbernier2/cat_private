import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  statusDate: {
    alignSelf: 'flex-end',
  },
  statusIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerIcon: {
    marginLeft: 8,
  },
});

export default styles;
