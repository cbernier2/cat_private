import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import CatScreen from '../../components/screen';
import CatButton from '../../components/button';
import CatText from '../../components/text';
import CatStopsFilters from '../../components/stops-filters';
import {CatStopsFiltersType} from '../../components/stops-filters/types';
import {SiteStopsChart} from '../../components/graphs/site-stops/Component';
import {currentShiftLabelSelector} from '../../redux/site/site-selectors';
import {ArrayUtils} from '../../utils/array-utils';
import {EquipmentList} from '../../components/graphs/site-stops/equipmentList/Component';
import {CatError} from '../../components/error';

import {
  siteEquipmentsObservationsSelector,
  siteObservationsSelector,
} from './selectors';
import {ScreenType} from './types';
import {useStyles} from './styles';

const SiteStopsScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const styles = useStyles();
  const [filters, setFilters] = useState<CatStopsFiltersType>({
    infiniteOnly: false,
    noReasonOnly: false,
  });

  const currentShift = useSelector(currentShiftLabelSelector);
  const siteStops = useSelector(siteObservationsSelector);
  const equipments = useSelector(siteEquipmentsObservationsSelector);
  // If the SVG becomes too long it makes the app crash...
  //  Split list into smaller chunks to render multiple SVGs instead
  const equipmentsGroups = ArrayUtils.splitArray(equipments, 10);

  const data = currentShift && equipments.length > 0;

  return (
    <CatScreen scroll={false} title={t('cat.site_stops')}>
      <View style={styles.headerContainer}>
        <CatText variant={'headlineSmall'}>
          {currentShift ?? t('no_shifts')}
        </CatText>
      </View>
      {equipments.length === 0 && (
        <View style={styles.noDataContainer}>
          <CatError message={t('cat.message_no_data_available')} />
        </View>
      )}
      {data && (
        <>
          <View style={styles.headerContainer}>
            <CatButton
              labelStyle={styles.addButtonLabel}
              style={styles.addButton}>
              {'+'}
            </CatButton>
            <View style={styles.filterButtonsContainer}>
              <CatStopsFilters
                onChange={newFilters => setFilters(newFilters)}
                initialState={filters}
              />
            </View>
          </View>
          <ScrollView>
            <View style={styles.verticalScrollWrapper}>
              <View>
                {equipmentsGroups.map((group, i) => (
                  <EquipmentList
                    key={`l${i}`}
                    equipments={group}
                    withSiteStopsRow={i === 0}
                  />
                ))}
              </View>
              <ScrollView horizontal>
                <View>
                  {equipmentsGroups.map((group, i) => (
                    <SiteStopsChart
                      key={`c${i}`}
                      equipments={group}
                      filters={filters}
                      siteStops={siteStops}
                      withSiteStopsRow={i === 0}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
    </CatScreen>
  );
};

export default SiteStopsScreen;
