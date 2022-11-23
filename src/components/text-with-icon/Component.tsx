import React from 'react';
import {CatTextWithIconType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import {View} from 'react-native';
import CatText from '../../components/text';
import styles from './styles';
import {isString} from 'lodash';
import {MinestarIcon} from '../minestar-icon';
import {MinestarIconName} from '../minestar-icon/types';

const CatTextWithIcon: React.FC<CatTextWithIconType> = props => {
  const {colors} = useCatTheme();

  const {
    icon,
    iconColor = colors.label,
    iconSize = 24,
    variant = 'bodyLarge',
    style: textStyle,
    ...textProps
  } = props;

  return (
    <View style={styles.container}>
      {isString(icon) ? (
        <MinestarIcon
          name={icon as MinestarIconName}
          size={iconSize}
          color={iconColor}
        />
      ) : (
        icon
      )}
      <CatText
        variant={variant}
        style={[styles.text, textStyle]}
        {...textProps}
      />
    </View>
  );
};

export default CatTextWithIcon;
