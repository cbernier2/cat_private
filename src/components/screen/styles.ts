import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  triggerContainer: {
    width: 25,
    height: 25,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
  },
  scrollViewContent: {
    marginBottom: 16,
    flexGrow: 1,
  },
});

export default styles;
