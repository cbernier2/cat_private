import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import {getEquipmentSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import {PageTitle} from '../../components/page-title/Component';
import {getEquipmentIcon} from '../../api/types/equipment';
import CatScreen from '../../components/screen';
import CatTabView from '../../components/tab-view';

import CatEquipmentDetails from './EquipmentDetails';
import {EquipmentStopsTab} from './EquipmentStopsTab';
import {ScreenType} from './types';

const pages = {
  'info-outline': CatEquipmentDetails,
  schedule: EquipmentStopsTab,
};

const EquipmentDetailsScreen = (props: ScreenType) => {
  const {navigation} = props;
  const context = props.route.params?.context;
  const {t} = useTranslation();
  const equipmentSelector = getEquipmentSelector(context);
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
      <CatTabView extraParams={{context}} pages={pages} />
    </CatScreen>
  );
};

export default EquipmentDetailsScreen;
