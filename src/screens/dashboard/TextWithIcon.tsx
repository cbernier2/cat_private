import React from 'react';
import {CatTextWithIconType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {View} from 'react-native';
import {useStyles} from './styles';
import CatText from '../../components/text';

const CatTextWithIcon: React.FC<CatTextWithIconType> = props => {
  const {colors} = useCatTheme();
  const styles = useStyles();

  const {
    icon,
    iconColor = colors.label,
    variant = 'bodyLarge',
    style: textStyle,
    ...textProps
  } = props;

  return (
    <View style={styles.textWithIconContainer}>
      {React.createElement(icon, {
        color: iconColor,
        width: 24,
        height: 24,
      })}
      <CatText
        variant={variant}
        style={[styles.textWithIcon, textStyle]}
        {...textProps}
      />
    </View>
  );
};

export default CatTextWithIcon;
