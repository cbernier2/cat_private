import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const safeArea = useSafeAreaInsets();

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
      paddingTop: 16 + safeArea.top,
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
};
