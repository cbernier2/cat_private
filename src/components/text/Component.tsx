import React from 'react';
import {Text} from 'react-native-paper';
import {CatTextType} from './types';
import useCatTheme from '../../hooks/useCatTheme';

const CatText: React.FC<CatTextType> = props => {
  const {variant = 'bodyMedium'} = props;
  const {colors} = useCatTheme();

  return (
    <Text
      {...props}
      style={[{color: colors.primary}, props.style]}
      variant={variant}
    />
  );
};

export default CatText;
