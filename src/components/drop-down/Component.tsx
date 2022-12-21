import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import {CatDropDownType} from './types';

const CatDropDown: React.FC<CatDropDownType> = props => {
  const [_showDropDown, _setShowDropDown] = useState(false);
  const {
    visible = _showDropDown,
    showDropDown = () => _setShowDropDown(true),
    onDismiss = () => _setShowDropDown(false),
    ...rest
  } = props;
  return (
    <DropDown
      mode="outlined"
      visible={visible}
      onDismiss={onDismiss}
      showDropDown={showDropDown}
      {...rest}
    />
  );
};

export default CatDropDown;
