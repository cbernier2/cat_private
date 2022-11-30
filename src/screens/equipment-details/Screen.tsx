import React, {useEffect} from 'react';

import {
  currentEquipmentSelector,
  searchEquipmentSelector,
} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import {ScreenType} from './types';
import CatEquipmentDetails from './EquipmentDetails';
import {PageTitle} from '../../components/page-title/Component';
import {getEquipmentIcon} from '../../api/types/equipment';
import CatScreen from '../../components/screen';
import CatTabView from '../../components/tab-view';
import {useTranslation} from 'react-i18next';

const pages = {
  'info-outline': CatEquipmentDetails,
  schedule: () => <></>,
};

const EquipmentDetailsScreen = (props: ScreenType) => {
  const {navigation} = props;
  const isSearch = Boolean(props.route.params?.search);
  const {t} = useTranslation();
  const equipmentSelector = isSearch
    ? searchEquipmentSelector
    : currentEquipmentSelector;
  const selectedEquipmentSummary = useCatSelector(equipmentSelector);

  useEffect(() => {
    if (!selectedEquipmentSummary) {
      navigation.goBack();
    }
  }, [selectedEquipmentSummary, navigation]);

  if (!selectedEquipmentSummary) {
    return null;
  }

  return (
    <CatScreen scroll={false} title={t('equipment_details_title')}>
      <PageTitle
        icon={getEquipmentIcon(
          selectedEquipmentSummary.equipment,
          selectedEquipmentSummary.type,
        )}
        title={selectedEquipmentSummary.equipment?.name}
      />
      <CatTabView extraParams={{isSearch}} pages={pages} />
    </CatScreen>
  );
};

export default EquipmentDetailsScreen;
