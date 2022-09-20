import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const useCatSelector = <T>(fn: (state: RootState) => T): T => {
  return useSelector(fn);
};

export default useCatSelector;
