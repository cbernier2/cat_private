import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  previewRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  equipmentName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timePickers: {
    flex: 1,
    flexDirection: 'row',
  },
  timePicker: {
    flexGrow: 1,
  },
  descriptionInput: {
    height: 100,
  },
});

export default styles;
