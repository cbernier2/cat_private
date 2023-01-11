// https://github.com/fateh999/react-native-paper-dropdown/blob/master/src/DropDown.tsx

import {View} from 'react-native';
import {TextInput, TouchableRipple} from 'react-native-paper';
import React, {forwardRef, useEffect, useState} from 'react';
import {CatDropDownType} from './types';
import CatTextInput from '../text-input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CatSelectList} from '../select-list/Component';

const CatDropDown = forwardRef<View, CatDropDownType>((props, ref) => {
  const [_showDropDown, _setShowDropDown] = useState(false);
  const {
    visible = _showDropDown,
    showDropDown = () => _setShowDropDown(true),
    onDismiss = () => _setShowDropDown(false),
    value,
    setValue,
    label,
    list,
    accessibilityLabel,
    placeholder,
    dropDownStyle,
    inputProps,
  } = props;
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    const _label = list.find(_ => _.value === value)?.label;
    if (_label) {
      setDisplayValue(_label);
    }
  }, [list, value]);

  return (
    <>
      <TouchableRipple
        ref={ref}
        onPress={showDropDown}
        accessibilityLabel={accessibilityLabel}>
        <View pointerEvents={'none'}>
          <CatTextInput
            value={displayValue}
            mode={'outlined'}
            label={label}
            placeholder={placeholder}
            pointerEvents={'none'}
            right={
              <TextInput.Icon
                icon={iconProps => (
                  <MaterialIcons
                    name={visible ? 'arrow-drop-up' : 'arrow-drop-down'}
                    {...iconProps}
                  />
                )}
              />
            }
            {...inputProps}
          />
        </View>
      </TouchableRipple>
      <CatSelectList
        visible={visible}
        list={list}
        value={value}
        setValue={setValue}
        title={label}
        onDismiss={onDismiss}
        contentViewStyle={dropDownStyle}
      />
    </>
  );
});

export default CatDropDown;
