import {MD3DarkTheme} from 'react-native-paper';
import {cloneDeep} from 'lodash';
import {MD3TypescaleKey} from 'react-native-paper/lib/typescript/types';

const fonts = cloneDeep(MD3DarkTheme.fonts);
Object.keys(fonts).forEach(variant => {
  fonts[variant as MD3TypescaleKey].fontFamily = 'Roboto';
});

export {fonts};
