import React from 'react';
import {Avatar} from 'react-native-paper';
import {CatUserBannerType} from './types';
import styles from './styles';
import {View} from 'react-native';
import CatText from '../text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CatUserBanner: React.FC<CatUserBannerType> = ({person, style}) => {
  return (
    <View style={[styles.container, style]}>
      {person.initials !== undefined && person.initials.length > 0 ? (
        <Avatar.Text size={40} label={person.initials} />
      ) : (
        <Avatar.Icon
          size={40}
          icon={props => <MaterialIcons name={'person-outline'} {...props} />}
        />
      )}
      <CatText variant={'titleMedium'} style={styles.userName}>
        {person.name}
      </CatText>
    </View>
  );
};

export default CatUserBanner;