import React, {useRef} from 'react';
import {List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {CatError} from '../../components/error';
import CatScreen from '../../components/screen';
import CatTextInput from '../../components/text-input';
import {CircledIcon} from '../../components/circled-icon/Component';
import {Category, CategoryType} from '../../api/types/cat/common';
import {MinestarIconName} from '../../components/minestar-icon/types';
import {
  TextInput as NativeTextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appActions} from '../../redux/app/app-slice';
import CatText from '../../components/text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useCatTheme from '../../hooks/useCatTheme';
import {useCatSearchFilter} from './useCatSearchFilter';
import useCatDispatch from '../../hooks/useCatDispatch';

const SearchScreen = () => {
  const dispatch = useCatDispatch();
  const {colors} = useCatTheme();
  const {t} = useTranslation();

  const textInputRef = useRef<NativeTextInput>(null);
  useFocusEffect(() => {
    textInputRef.current?.focus();
  });

  const {filter, setFilter, results, error, filteredSearchHistory} =
    useCatSearchFilter();

  const getIcon = (type: CategoryType): MinestarIconName => {
    return Category.findByCategoryType(type)?.icon as MinestarIconName;
  };

  const onItemSelected = () => {
    dispatch(appActions.addSearchTermToHistory(filter));
  };

  return (
    <CatScreen
      style={styles.container}
      scroll={false}
      title={t('cat.button_search')}>
      <CatTextInput
        label={t('cat.button_search')}
        value={filter}
        onChangeText={value => setFilter(value)}
        ref={textInputRef}
      />
      {filteredSearchHistory.length > 0 && (
        <View style={styles.historyHeader}>
          <CatText>{t('search_recent')}</CatText>
          <TouchableOpacity
            onPress={() => dispatch(appActions.clearAllSearchTermHistory())}>
            <CatText style={styles.historyHeaderClearAll}>
              {t('search_clear_all')}
            </CatText>
          </TouchableOpacity>
        </View>
      )}
      <CatError message={error} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <List.Section>
          {filteredSearchHistory.map(searchTerm => (
            <List.Item
              key={searchTerm}
              title={searchTerm}
              onPress={() => setFilter(searchTerm)}
              right={() => (
                <TouchableOpacity
                  onPress={() =>
                    dispatch(appActions.removeSearchTermFromHistory(searchTerm))
                  }>
                  <MaterialIcons
                    name={'close'}
                    size={24}
                    color={colors.onSurface}
                  />
                </TouchableOpacity>
              )}
            />
          ))}
          {results.map((item, i) => (
            <List.Item
              key={`r${i}`}
              title={item.label}
              onPress={() => {
                onItemSelected();
                item.onPress(item);
              }}
              left={() => <CircledIcon name={getIcon(item.type)} />}
            />
          ))}
        </List.Section>
      </KeyboardAwareScrollView>
    </CatScreen>
  );
};

export default SearchScreen;
