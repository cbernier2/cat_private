import {SearchItem} from './types';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import useCatDispatch from '../../hooks/useCatDispatch';
import {searchHistorySelector} from '../../redux/app/app-selectors';
import {
  areasSelector,
  equipmentsSelector,
  operatorsSelector,
  routesSelector,
} from '../../redux/site/site-selectors';
import {MainContext, siteActions} from '../../redux/site/site-slice';
import {
  CatAreaSummary,
  CatEquipmentSummary,
  CatRouteSummary,
} from '../../redux/site/helpers/transformSummaries';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

export const useCatSearchFilter = () => {
  const navigation = useNavigation<MaterialBottomTabNavigationProp<any>>();
  const {t} = useTranslation();
  const dispatch = useCatDispatch();
  const [filter, setFilter] = useState<string>('');
  const searchHistory = useSelector(searchHistorySelector);

  const areas = useSelector(areasSelector);
  const equipments = useSelector(equipmentsSelector);
  const operators = useSelector(operatorsSelector);
  const routes = useSelector(routesSelector);
  const context: MainContext = 'search';

  return useMemo(() => {
    let filteredSearchHistory = searchHistory
      .filter(
        searchTerm =>
          searchTerm.toLowerCase().includes(filter.toLowerCase()) &&
          searchTerm.toLowerCase() !== filter.toLowerCase(),
      )
      .slice(0, 10);

    if (!filter) {
      return {filter, setFilter, error: '', results: [], filteredSearchHistory};
    }

    const goToArea = (item: SearchItem) => {
      const area = item as CatAreaSummary;
      dispatch(
        siteActions.setCurrentArea({
          id: area.area.id,
          type: area.type,
          context,
        }),
      );
      navigation.navigate('AreaDetails');
    };

    const goToEquipment = (item: SearchItem) => {
      const equipment = item as CatEquipmentSummary;
      dispatch(
        siteActions.setCurrentEquipment({
          name: equipment.equipment?.name,
          category: equipment.type,
          context,
        }),
      );
      navigation.navigate('EquipmentDetails');
    };

    const goToRoute = (item: SearchItem) => {
      const route = item as CatRouteSummary;
      dispatch(
        siteActions.setCurrentRouteName({
          name: route.route.name,
          context,
        }),
      );
      navigation.navigate('RouteOverview');
    };

    const equipmentIdsFromOperators = operators
      .filter(operator =>
        operator.name?.toLowerCase().includes(filter.toLowerCase()),
      )
      .map(operator => operator.operatorInfo?.operatorAssignments)
      .flat()
      .map(assignment => assignment?.equipmentId ?? '')
      .filter(id => id !== '');

    const filteredAreas: SearchItem[] =
      areas
        ?.filter(item =>
          item.area.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(item => ({
          ...item,
          label: item.area.name,
          onPress: goToArea,
        })) ?? [];

    const filteredEquipments: SearchItem[] =
      equipments
        ?.filter(
          item =>
            item.equipment?.name.toLowerCase().includes(filter.toLowerCase()) ||
            equipmentIdsFromOperators.includes(item.equipment?.id ?? ''),
        )
        .map(item => ({
          ...item,
          label: item.equipment!.name,
          onPress: goToEquipment,
        })) ?? [];

    const filteredRoutes: SearchItem[] =
      routes
        ?.filter(item =>
          item.route.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(item => ({
          ...item,
          label: item.route.name,
          onPress: goToRoute,
        })) ?? [];

    const results = [
      ...filteredAreas,
      ...filteredEquipments,
      ...filteredRoutes,
    ];

    if (results.length > 0) {
      filteredSearchHistory = filteredSearchHistory.slice(0, 3);
    }

    return {
      filter,
      setFilter,
      error: results.length ? '' : t('search_no_results'),
      results,
      filteredSearchHistory,
    };
  }, [
    areas,
    dispatch,
    equipments,
    filter,
    navigation,
    operators,
    routes,
    searchHistory,
    t,
  ]);
};
