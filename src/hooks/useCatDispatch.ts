import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux';

const useCatDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default useCatDispatch;
