import React, {useState} from 'react';
import {useStyles} from './styles';
import {View} from 'react-native';
import {ToggleButton} from 'react-native-paper';
import {CatStopsFiltersComponentType, CatStopsFiltersType} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatStopsFilters: React.FC<CatStopsFiltersComponentType> = ({
  onChange,
  initialState,
}) => {
  const styles = useStyles();

  const [status, _setStatus] = useState<CatStopsFiltersType>(initialState);

  const toggleStatus = (field: keyof CatStopsFiltersType) => {
    const newStatus = {...status, ...{[field]: !status[field]}};
    _setStatus(newStatus);
    onChange(newStatus);
  };

  const getCheckedStatus = (field: keyof CatStopsFiltersType) => {
    return status[field] ? 'checked' : 'unchecked';
  };

  const toggleButtons: {[field in keyof CatStopsFiltersType]: string} = {
    infiniteOnly: 'all-inclusive',
    noReasonOnly: 'help-outline',
  };

  return (
    <View style={styles.container}>
      {(Object.keys(toggleButtons) as (keyof CatStopsFiltersType)[]).map(
        (field, i) => (
          <ToggleButton
            key={field}
            icon={({color, size}) => (
              <MaterialIcons
                name={toggleButtons[field]}
                color={color}
                size={size}
              />
            )}
            status={getCheckedStatus(field)}
            onPress={() => toggleStatus(field)}
            style={[
              styles.toggleButton,
              i === Object.keys(toggleButtons).length - 1
                ? styles.toggleButtonLast
                : undefined,
              status[field] ? styles.toggleButtonSelected : undefined,
            ]}
          />
        ),
      )}
    </View>
  );
};

export default CatStopsFilters;
