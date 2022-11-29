import {Person} from '../../api/types/cat/person';
import {ViewStyle} from 'react-native';

export type CatUserBannerType = {
  person: Person;
  style?: ViewStyle;
};
