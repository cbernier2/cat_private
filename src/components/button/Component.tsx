import React from 'react';
import {Button} from 'react-native-paper';
import {CatButtonType} from './types';

const CatButton: React.FC<CatButtonType> = props => {
  const {mode = 'contained'} = props;
  return <Button {...props} mode={mode} />;
};

export default CatButton;
