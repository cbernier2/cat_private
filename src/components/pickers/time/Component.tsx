import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TimePickerModal} from 'react-native-paper-dates';

import {CatTimePickerType, CatTimePickerSelection} from './types';

export const CatTimePicker: React.FC<CatTimePickerType> = props => {
  const {i18n} = useTranslation();
  const [visible, setVisible] = useState(false);

  const {
    animationType = 'fade',
    children,
    locale = i18n.language,
    onConfirm,
    uppercase = false,
    ...rest
  } = props;

  const handleConfirm = (data: CatTimePickerSelection) => {
    setVisible(false);
    onConfirm(data);
  };

  return (
    <>
      <TimePickerModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        onConfirm={handleConfirm}
        uppercase={uppercase}
        animationType={animationType}
        locale={locale}
        {...rest}
      />
      <Pressable onPress={() => setVisible(true)}>{children}</Pressable>
    </>
  );
};
