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
    padding: 16,
    paddingBottom: 28,
    flexGrow: 1,
  },
  menuUserNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 16,
  },
  userName: {
    marginLeft: 14,
  },
  menuItemsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemTextContainer: {
    flexDirection: 'column',
  },
  menuItemSubText: {
    marginTop: 4,
  },
  menuItemSpacer: {
    height: 20,
  },
  menuItemsMiddle: {
    flexGrow: 1,
  },
});

export default styles;
