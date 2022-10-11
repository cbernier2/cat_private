import React, {useState} from 'react';
import {TimePickerModal} from 'react-native-paper-dates';

import CatButton from '../../button';

import {CatTimePickerType, CatTimePickerSelection} from './types';

export const CatTimePicker: React.FC<CatTimePickerType> = ({onSelect}) => {
  const [visible, setVisible] = useState(false);

  const onConfirm = ({hours, minutes}: CatTimePickerSelection) => {
    setVisible(false);
    onSelect({hours, minutes});
  };

  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        onConfirm={onConfirm}
        hours={12} // default: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        uppercase={false} // optional, default is true
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="en" // optional, default is automatically detected by your system
        // keyboardIcon="keyboard-outline" // optional, default is "keyboard-outline"
        // clockIcon="clock-outline" // optional, default is "clock-outline"
      />
      <CatButton onPress={() => setVisible(true)}>Pick time</CatButton>
    </>
  );
};
