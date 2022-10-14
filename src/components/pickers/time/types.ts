export interface CatTimePickerType {
  onSelect: (time: CatTimePickerSelection) => void;
}

export interface CatTimePickerSelection {
  hours: number;
  minutes: number;
}
