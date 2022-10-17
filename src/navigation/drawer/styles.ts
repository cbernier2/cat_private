import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  menuHeaderContainer: {
    flexDirection: 'column',
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuBodyContainer: {
    flexGrow: 1,
  },
  menuUserNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userName: {
    marginLeft: 14,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
