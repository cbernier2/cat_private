import React from 'react';
import {CatTextWithLabelType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {TextStyle, View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';

const CatTextWithLabel: React.FC<CatTextWithLabelType> = ({
  label,
  isPrimary,
  variant = 'bodyLarge',
  ...textProps
}) => {
  const {colors} = useCatTheme();

  const valueStyle: TextStyle = isPrimary ? {color: colors.primary} : {};

  return (
    <View style={styles.textWithLabelContainer}>
      <CatText variant={'labelLarge'}>{label}</CatText>
      <CatText
        variant={variant}
        style={[textProps.style, valueStyle]}
        {...textProps}
      />
    </View>
  );
};

export default CatTextWithLabel;
