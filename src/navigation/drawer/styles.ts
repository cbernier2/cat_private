import {StyleSheet} from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
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
      paddingVertical: 8,
      paddingLeft: 20,
      paddingRight: 20,
    },
    menuBodyContainer: {
      flexGrow: 1,
    },
    menuUserNameContainer: {
      padding: 16,
    },
    menuItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 0,
      marginLeft: 10,
    },
  });
};
