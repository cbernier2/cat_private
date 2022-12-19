import {useWindowDimensions} from 'react-native';

export const useGraphWidth = () => {
  return useWindowDimensions().width - 30;
};
