import {StyleProp, ViewStyle} from 'react-native';

export interface CatErrorType {
  message: string;
  style?: StyleProp<ViewStyle>;
  visible: boolean;
}
