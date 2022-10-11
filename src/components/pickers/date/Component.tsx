import React from 'react';
import {DatePickerModal} from 'react-native-paper-dates';

import CatButton from '../../button';

import {CatDatePickerType} from './types';

export const CatDatePicker: React.FC<CatDatePickerType> = ({
  date,
  onSelect,
}) => {
  const [value, setValue] = React.useState<Date | undefined>(date);
  const [visible, setVisible] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    (data: any) => {
      setVisible(false);
      setValue(data.date);
      onSelect(data.date);
    },
    [onSelect, setVisible],
  );

  return (
    <>
      <CatButton onPress={() => setVisible(true)} mode="outlined">
        Pick single date
      </CatButton>
      <DatePickerModal
        locale="en" // Not optional for date pickers...
        mode="single"
        visible={visible}
        onDismiss={onDismiss}
        date={value}
        onConfirm={onConfirm}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
    </>
  );
}
