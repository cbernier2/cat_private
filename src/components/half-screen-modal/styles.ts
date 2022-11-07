import {StyleSheet} from 'react-native';

import {Ratio} from './types';

export const useStyles = (ratio: Ratio = '1:1') => {
  const [top, bottom] = ratio.split(':');

  return StyleSheet.create({
    bottom: {flex: Number(bottom)},
    fill: {flex: 1},
    top: {backgroundColor: 'transparent', flex: Number(top)},
  });
};
