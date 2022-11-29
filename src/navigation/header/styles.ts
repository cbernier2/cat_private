import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    marginLeft: 10,
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
    marginLeft: 6,
  },
});

export default styles;
