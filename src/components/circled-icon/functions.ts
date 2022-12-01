import {CircledIconType} from './types';

export const getKey = (
  {name, iconColor, iconSize}: CircledIconType,
  iOSFix?: string,
) => `${name}-${iconColor as string}-${iconSize}-${iOSFix}`;
