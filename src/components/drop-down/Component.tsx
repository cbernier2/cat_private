// https://github.com/fateh999/react-native-paper-dropdown/blob/master/src/DropDown.tsx

import {LayoutChangeEvent, ScrollView, View} from 'react-native';
import {
  Checkbox,
  Divider,
  Menu,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import React, {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {CatDropDownType} from './types';
import useCatTheme from '../../hooks/useCatTheme';
import CatTextInput from '../text-input';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatDropDown = forwardRef<View, CatDropDownType>((props, ref) => {
  const [_showDropDown, _setShowDropDown] = useState(false);
  const {colors} = useCatTheme();
  const {
    visible = _showDropDown,
    showDropDown = () => _setShowDropDown(true),
    onDismiss = () => _setShowDropDown(false),
    multiSelect = false,
    value,
    setValue,
    label,
    list,
    dropDownContainerMaxHeight,
    dropDownContainerHeight,
    accessibilityLabel,
    placeholder,
    dropDownStyle,
    dropDownItemSelectedTextStyle,
    dropDownItemSelectedStyle,
    dropDownItemStyle,
    dropDownItemTextStyle,
    inputProps,
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => {
    if (multiSelect) {
      const _labels = list
        .filter(_ => value.indexOf(_.value) !== -1)
        .map(_ => _.label)
        .join(', ');
      setDisplayValue(_labels);
    } else {
      const _label = list.find(_ => _.value === value)?.label;
      if (_label) {
        setDisplayValue(_label);
      }
    }
  }, [list, multiSelect, value]);

  const isActive = useCallback(
    (currentValue: any) => {
      if (multiSelect) {
        return value.indexOf(currentValue) !== -1;
      } else {
        return value === currentValue;
      }
    },
    [multiSelect, value],
  );

  const setActive = useCallback(
    (currentValue: any) => {
      if (multiSelect) {
        const valueIndex = value.indexOf(currentValue);
        const values = value.split(',');
        if (valueIndex === -1) {
          setValue([...values, currentValue].join(','));
        } else {
          setValue(
            [...values]
              .filter(filterValue => filterValue !== currentValue)
              .join(','),
          );
        }
      } else {
        setValue(currentValue);
      }
    },
    [multiSelect, setValue, value],
  );

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchor={
        <TouchableRipple
          ref={ref}
          onPress={showDropDown}
          onLayout={onLayout}
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
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height,
        ...dropDownStyle,
      }}>
      <ScrollView
        bounces={false}
        style={{
          ...(dropDownContainerHeight
            ? {
                height: dropDownContainerHeight,
              }
            : {
                maxHeight: dropDownContainerMaxHeight || 200,
              }),
        }}>
        {list.map((_item, _index) => (
          <Fragment key={_item.value}>
            <TouchableRipple
              style={styles.menuItemTouch}
              onPress={() => {
                setActive(_item.value);
                if (onDismiss) {
                  onDismiss();
                }
              }}>
              <Fragment>
                <Menu.Item
                  titleStyle={{
                    color: isActive(_item.value) ? colors.primary : colors.text,
                    ...(isActive(_item.value)
                      ? dropDownItemSelectedTextStyle
                      : dropDownItemTextStyle),
                  }}
                  title={_item.custom || _item.label}
                  style={[
                    styles.menuItem,
                    {
                      maxWidth: inputLayout?.width,
                      ...(isActive(_item.value)
                        ? dropDownItemSelectedStyle
                        : dropDownItemStyle),
                    },
                  ]}
                />
                {multiSelect && (
                  <Checkbox.Android
                    theme={{
                      colors: {accent: colors.primary},
                    }}
                    status={isActive(_item.value) ? 'checked' : 'unchecked'}
                    onPress={() => setActive(_item.value)}
                  />
                )}
              </Fragment>
            </TouchableRipple>
            <Divider />
          </Fragment>
        ))}
      </ScrollView>
    </Menu>
  );
});

export default CatDropDown;
