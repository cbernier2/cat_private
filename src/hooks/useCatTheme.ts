import useCatSelector from './useCatSelector';
import {themeSelector} from '../redux/app-selectors';

const useCatTheme = () => {
  return useCatSelector(themeSelector);
};

export default useCatTheme;
