import {ComponentProps} from 'react';
import {Text} from 'react-native-paper';

export type CatTextWithLabelType = ComponentProps<typeof Text> & {
  label: string;
  labelProps?: Partial<ComponentProps<typeof Text>>;
  isPrimary?: boolean;
  isDown?: boolean;
};
