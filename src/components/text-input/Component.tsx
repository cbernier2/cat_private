import React, {forwardRef} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {CatTextInputType} from './types';
import {TextInput as NativeTextInput} from 'react-native';

const CatTextInput = forwardRef<NativeTextInput, CatTextInputType>(
  (props, ref) => {
    return (
      <>
        <TextInput ref={ref} mode="outlined" {...props} />
        <HelperText
          type="error"
          visible={Boolean(props.error && props.errorMessage)}>
          {props.errorMessage}
        </HelperText>
      </>
    );
  },
);

export default CatTextInput;
