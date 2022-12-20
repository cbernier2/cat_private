import React, {useState} from 'react';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {useStyles} from './styles';
import CatButton from '../../components/button';
import CatText from '../../components/text';
import CatStopsFilters from '../../components/stops-filters';
import {CatStopsFiltersType} from '../../components/stops-filters/types';
import {SiteStopsChart} from '../../components/graphs/site-stops/Component';
import {useSelector} from 'react-redux';
import {
  currentShiftLabelSelector,
  siteEquipmentsObservationsSelector,
  siteObservationsSelector,
} from '../../redux/site/site-selectors';
import {ArrayUtils} from '../../utils/array-utils';
import {EquipmentList} from '../../components/graphs/site-stops/equipmentList/Component';

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

  return (
    <CatScreen scroll={false} title={t('cat.site_stops')}>
      <View style={styles.headerContainer}>
        <CatText variant={'headlineSmall'}>{currentShift}</CatText>
      </View>
      <View style={styles.headerContainer}>
        <CatButton labelStyle={styles.addButtonLabel} style={styles.addButton}>
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
    </CatScreen>
  );
};

export default SiteStopsScreen;
