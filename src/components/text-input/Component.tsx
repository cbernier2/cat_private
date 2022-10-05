import React from 'react';
import {TextInput} from 'react-native';
import {CatTextInputType} from './types';
import {useTheme} from 'react-native-paper';

const CatTextInput: React.FC<CatTextInputType> = props => {
  const {colors} = useTheme();

  return <TextInput {...props} style={[{color: colors.text}, props.style]} />;
};

export default CatTextInput;
