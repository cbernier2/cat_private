import React, {useState} from 'react';
import {CatAccordionType} from './types';
import {Divider} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import useCatTheme from '../../hooks/useCatTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const CatAccordion: React.FC<CatAccordionType> = ({children}) => {
  const {colors} = useCatTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isExpanded && children}
      <TouchableOpacity style={styles.accordionHandle} onPress={() => toggle()}>
        <MaterialIcons
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          color={colors.onSurface}
          size={24}
        />
      </TouchableOpacity>
      <Divider style={styles.accordionDivider} />
    </>
  );
};

export default CatAccordion;
