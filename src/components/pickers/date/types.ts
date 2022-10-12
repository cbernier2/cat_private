import {SetStateAction} from 'react';

export interface CatDatePickerType {
  date?: Date;
  onSelect: (date: CatDatePickerSelection) => void;
}

export interface CatDatePickerSelection {
  date: SetStateAction<Date | undefined>;
}
