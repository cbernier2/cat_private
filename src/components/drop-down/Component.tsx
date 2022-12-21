import React from 'react';
import {CatDropDownType} from './types';
import {Dropdown} from 'sharingan-rn-modal-dropdown';

const CatDropDown: React.FC<CatDropDownType> = props => {
  return <Dropdown {...props} />;
};

export default CatDropDown;
