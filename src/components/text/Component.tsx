import React from 'react';
import {Text} from 'react-native-paper';
import {CatTextType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {TextStyle} from 'react-native';

const CatText: React.FC<CatTextType> = props => {
  const {variant = 'bodyMedium'} = props;
  const {colors} = useCatTheme();

  // TODO: Use MD3 colors
  const getStyle = (): TextStyle | undefined => {
    if (variant.startsWith('label')) {
      return {color: colors.onSurfaceDisabled};
    } else if (variant.startsWith('headline') || variant.startsWith('title')) {
      return {color: colors.onSurfaceVariant};
    } else {
      return undefined;
    }
  };

  return (
    <Text {...props} style={[getStyle(), props.style]} variant={variant} />
  );
};

export default CatText;
