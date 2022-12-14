import React from 'react';
import {CatTextWithLabelType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {TextStyle, View} from 'react-native';
import CatText from '../../components/text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const CatTextWithLabel: React.FC<CatTextWithLabelType> = ({
  label,
  isPrimary,
  variant = 'bodyLarge',
  isDown = false,
  labelProps = {},
  style: textStyle,
  ...textProps
}) => {
  const {colors} = useCatTheme();

  const valueStyle: TextStyle = isPrimary ? {color: colors.secondary} : {};

  return (
    <View style={styles.container}>
      <CatText
        style={styles.label}
        variant={labelProps?.variant || 'labelMedium'}
        {...labelProps}>
        {label}
      </CatText>
      {isDown && (
        <MaterialIcons
          style={styles.downArrow}
          name={'arrow-drop-down'}
          color={colors.error}
          size={24}
        />
      )}
      {React.isValidElement(textProps.children) ? (
        textProps.children
      ) : (
        <CatText
          variant={variant}
          style={[textStyle, valueStyle]}
          {...textProps}
        />
      )}
    </View>
  );
};

export default CatTextWithLabel;
