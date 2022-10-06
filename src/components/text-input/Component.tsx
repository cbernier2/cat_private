import React from 'react';
import {TextInput} from 'react-native';
import {CatTextInputType} from './types';
import useCatTheme from '../../hooks/useCatTheme';

const CatTextInput: React.FC<CatTextInputType> = props => {
  const {colors} = useCatTheme();

  return <TextInput {...props} style={[{color: colors.text}, props.style]} />;
};

export default CatTextInput;
