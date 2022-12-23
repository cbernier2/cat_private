import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import {getEquipmentSelector} from '../../redux/site/site-selectors';
import useCatSelector from '../../hooks/useCatSelector';
import {PageTitle} from '../../components/page-title/Component';
import {CatEquipmentIcon} from '../../components/equipment-icon';
import CatScreen from '../../components/screen';
import CatTabView from '../../components/tab-view';
import {equipmentIconDataSelector} from '../../components/equipment-icon/selectors';
import {getEquipmentBadge} from '../../api/types/equipment';
import {CatEquipmentSummary} from '../../redux/site/helpers/transformSummaries';

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
  const equipmentIconData = useCatSelector(state =>
    equipmentIconDataSelector(
      state,
      selectedEquipmentSummary as CatEquipmentSummary,
    ),
  );
  const badge = getEquipmentBadge(equipmentIconData.observationCount);

  const extraParams = {
    context,
    schedule: {badge},
  };

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
        icon={
          <CatEquipmentIcon
            equipmentSummary={selectedEquipmentSummary}
            fillColor={'transparent'}
            type={selectedEquipmentSummary.type}
          />
        }
        title={selectedEquipmentSummary.equipment?.name}
      />
      <CatTabView extraParams={extraParams} pages={pages} />
    </CatScreen>
  );
};

export default EquipmentDetailsScreen;
