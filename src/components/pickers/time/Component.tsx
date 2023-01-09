import React from 'react';
import {useTranslation} from 'react-i18next';
import {TimePickerModal} from 'react-native-paper-dates';

import {CatTimePickerType, CatTimePickerSelection} from './types';

export const CatTimePicker: React.FC<CatTimePickerType> = props => {
  const {i18n} = useTranslation();

  const {
    animationType = 'fade',
    locale = i18n.language,
    onConfirm,
    uppercase = false,
    ...rest
  } = props;

  const handleConfirm = (data: CatTimePickerSelection) => {
    props.onDismiss();
    onConfirm(data);
  };

  return (
    <TimePickerModal
      onConfirm={handleConfirm}
      uppercase={uppercase}
      animationType={animationType}
      locale={locale}
      {...rest}
    />
  );
};
