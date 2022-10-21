import React from 'react';
import {CatTextWithLabelType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {TextStyle, View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatTextWithLabel: React.FC<CatTextWithLabelType> = ({
  label,
  isPrimary,
  variant = 'bodyLarge',
  isDown = false,
  ...textProps
}) => {
  const {colors} = useCatTheme();

  const valueStyle: TextStyle = isPrimary ? {color: colors.primary} : {};

  return (
    <View style={styles.textWithLabelContainer}>
      <CatText style={styles.textWithLabelLabel} variant={'labelMedium'}>
        {label}
      </CatText>
      {isDown && (
        <MaterialIcons
          style={styles.textWithLabelDownArrow}
          name={'arrow-drop-down'}
          color={colors.error}
          size={24}
        />
      )}
      <CatText
        variant={variant}
        style={[styles.textWithLabelText, textProps.style, valueStyle]}
        {...textProps}
      />
    </View>
  );
};

export default CatTextWithLabel;
