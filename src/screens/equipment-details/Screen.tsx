import React, {useEffect} from 'react';

import {currentEquipmentSelector} from '../../redux/site/site-selectors';
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

const EquipmentDetailsScreen: React.FC<ScreenType> = ({navigation}) => {
  const {t} = useTranslation();
  const currentEquipmentSummary = useCatSelector(currentEquipmentSelector);

  useEffect(() => {
    if (!currentEquipmentSummary) {
      navigation.goBack();
    }
  }, [currentEquipmentSummary, navigation]);

  if (!currentEquipmentSummary) {
    return null;
  }

  return (
    <CatScreen scroll={false} title={t('equipment_details_title')}>
      <PageTitle
        icon={getEquipmentIcon(
          currentEquipmentSummary.equipment,
          currentEquipmentSummary.type,
        )}
        title={currentEquipmentSummary.equipment?.name}
      />
      <CatTabView pages={pages} />
    </CatScreen>
  );
};

export default EquipmentDetailsScreen;
