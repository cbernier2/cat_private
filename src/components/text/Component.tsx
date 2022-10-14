import React from 'react';
import {Text} from 'react-native-paper';
import {CatTextType} from './types';
import useCatTheme from '../../hooks/useCatTheme';

const CatText: React.FC<CatTextType> = props => {
  const {variant = 'bodyMedium'} = props;
  const {colors} = useCatTheme();

  const getColor = () => {
    if (variant.startsWith('body')) {
      return colors.text;
    } else if (variant.startsWith('label')) {
      return colors.label;
    } else if (variant.startsWith('headline') || variant.startsWith('title')) {
      return colors.title;
    } else {
      colors.primary;
    }
  };

  return (
    <Text
      {...props}
      style={[{color: getColor()}, props.style]}
      variant={variant}
    />
  );
};

export default CatText;
