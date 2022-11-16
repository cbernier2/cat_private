import React from 'react';
import {CatTextWithIconType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {View} from 'react-native';
import CatText from '../../components/text';
import styles from './styles';

const CatTextWithIcon: React.FC<CatTextWithIconType> = props => {
  const {colors} = useCatTheme();

  const {
    iconNode,
    icon,
    iconColor = colors.label,
    iconSize = 24,
    variant = 'bodyLarge',
    style: textStyle,
    ...textProps
  } = props;

  return (
    <View style={styles.container}>
      {icon !== undefined &&
        React.createElement(icon, {
          fill: iconColor,
          width: iconSize,
          height: iconSize,
        })}
      {iconNode !== undefined && iconNode}
      <CatText
        variant={variant}
        style={[styles.text, textStyle]}
        {...textProps}
      />
    </View>
  );
};

export default CatTextWithIcon;
