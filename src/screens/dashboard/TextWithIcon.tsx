import React from 'react';
import {CatTextWithIconType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {View} from 'react-native';
import styles from './styles';
import CatText from '../../components/text';

const CatTextWithIcon: React.FC<CatTextWithIconType> = props => {
  const {colors} = useCatTheme();
  const {
    icon,
    iconColor = colors.label,
    variant = 'bodyLarge',
    ...textProps
  } = props;

  return (
    <View style={styles.textWithIconContainer}>
      {React.createElement(icon, {color: iconColor, width: 24, height: 24})}
      <CatText variant={variant} {...textProps} />
    </View>
  );
};

export default CatTextWithIcon;
