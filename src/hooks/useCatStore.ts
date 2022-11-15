import {useStore} from 'react-redux';
import {RootState} from '../redux';

const useCatStore = () => {
  return useStore<RootState>();
};

export default useCatStore;
