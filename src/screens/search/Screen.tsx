import React, {useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CatError} from '../../components/error';
import CatScreen from '../../components/screen';
import CatTextInput from '../../components/text-input';
import {CircledIcon} from '../../components/circled-icon/Component';
import {Category, CategoryType} from '../../api/types/cat/common';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {
  areasSelector,
  equipmentsSelector,
  operatorsSelector,
  routesSelector,
} from '../../redux/site/site-selectors';

import {ScreenType, SearchItem} from './types';
import styles from './styles';

const SearchScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [filter, setFilter] = useState<string>('');

  const areas = useSelector(areasSelector);
  const equipments = useSelector(equipmentsSelector);
  const operators = useSelector(operatorsSelector);
  const routes = useSelector(routesSelector);

  const getIcon = (type: CategoryType): MinestarIconName => {
    return Category.findByCategoryType(type)?.icon as MinestarIconName;
  };

  const {error, results} = useMemo(() => {
    if (!filter) {
      return {error: '', results: []};
    }

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
        .map(item => ({...item, label: item.area.name})) ?? [];

    const filteredEquipments: SearchItem[] =
      equipments
        ?.filter(
          item =>
            item.equipment?.name.toLowerCase().includes(filter.toLowerCase()) ||
            equipmentIdsFromOperators.includes(item.equipment?.id ?? ''),
        )
        .map(item => ({...item, label: item.equipment!.name})) ?? [];

    const filteredRoutes: SearchItem[] =
      routes
        ?.filter(item =>
          item.route.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(item => ({...item, label: item.route.name})) ?? [];

    const items = [...filteredAreas, ...filteredEquipments, ...filteredRoutes];

    return {
      error: items.length ? '' : t('search_no_results'),
      results: items,
    };
  }, [areas, equipments, filter, operators, routes, t]);

  return (
    <SafeAreaView style={styles.container}>
      <CatScreen title={t('cat.button_search')}>
        <CatTextInput
          style={styles.mh}
          label={t('cat.button_search')}
          value={filter}
          onChangeText={value => setFilter(value)}
        />
        <List.Section style={styles.mh}>
          <ScrollView>
            <CatError style={styles.mh} message={error} />
            {results.map((item, i) => (
              <List.Item
                key={`r${i}`}
                title={item.label}
                onPress={() => console.log(item.id, item.type)}
                left={() => <CircledIcon name={getIcon(item.type)} />}
              />
            ))}
          </ScrollView>
        </List.Section>
      </CatScreen>
    </SafeAreaView>
  );
};

export default SearchScreen;
