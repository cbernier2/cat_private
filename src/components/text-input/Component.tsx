import React, {forwardRef} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {CatTextInputType} from './types';
import {TextInput as NativeTextInput} from 'react-native';

const CatTextInput = forwardRef<NativeTextInput, CatTextInputType>(
  ({errorMessage, ...inputProps}, ref) => {
    return (
      <>
        <TextInput ref={ref} mode="outlined" {...inputProps} />
        {errorMessage !== undefined && (
          <HelperText visible={errorMessage.length > 0} type="error">
            {errorMessage}
          </HelperText>
        )}
      </>
    );
  },
);

export default CatTextInput;
