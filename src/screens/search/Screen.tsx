import React from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';
import {CatTimePicker} from '../../components/pickers/time/Component';
import CatButton from '../../components/button';

const SearchScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();

  return (
    <CatScreen title={t('cat.button_search')}>
      <CatTimePicker onConfirm={console.log}>
        <CatButton>Pick time</CatButton>
      </CatTimePicker>
    </CatScreen>
  );
};

export default SearchScreen;
