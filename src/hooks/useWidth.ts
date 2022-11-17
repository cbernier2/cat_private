import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const window = Dimensions.get('window');

export const useWidth = () => {
  const [width, setWidth] = useState(window.width - 30);
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', d => {
      setWidth(d.window.width - 30);
    });
    return () => subscription?.remove();
  }, [setWidth]);

  return width;
};
