import {ComponentProps} from 'react';
import {TextInput} from 'react-native-paper';

export type CatTextInputType = ComponentProps<typeof TextInput> & {
  errorMessage?: string;
};
