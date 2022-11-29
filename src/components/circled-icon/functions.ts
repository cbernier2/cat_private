import {CircledIconType} from './types';

export const getKey = ({name, iconColor, iconSize}: CircledIconType) =>
  `${name}-${iconColor as string}-${iconSize}`;
