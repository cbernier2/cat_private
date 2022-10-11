export interface CatDatePickerType {
  date?: Date;
  onSelect: (time: {hours: number; minutes: number}) => void;
}
