import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {CatTextInputType} from './types';

const CatTextInput: React.FC<CatTextInputType> = props => {
  return (
    <>
      <TextInput mode="outlined" {...props} />
      <HelperText
        type="error"
        visible={Boolean(props.error && props.errorMessage)}>
        {props.errorMessage}
      </HelperText>
    </>
  );
};

export default CatTextInput;
