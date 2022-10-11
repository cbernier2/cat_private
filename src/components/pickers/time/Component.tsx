import React from 'react';
import {TimePickerModal} from 'react-native-paper-dates';

import CatButton from '../../button';

import {CatTimePickerType} from './types';

export const CatTimePicker: React.FC<CatTimePickerType> = ({onSelect}) => {
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    // @ts-ignore
    ({hours, minutes}) => {
      setVisible(false);
      onSelect({hours, minutes});
    },
    [onSelect, setVisible],
  );

  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
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
