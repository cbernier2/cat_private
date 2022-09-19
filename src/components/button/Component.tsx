import React from 'react';
import {Button} from 'react-native';
import {CatButtonType} from './types';

const CatButton: React.FC<CatButtonType> = props => {
  return <Button {...props} />;
};

export default CatButton;
