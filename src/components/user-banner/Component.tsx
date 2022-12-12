import React from 'react';
import {Avatar} from 'react-native-paper';
import {CatUserBannerType} from './types';
import styles from './styles';
import {View} from 'react-native';
import CatText from '../text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Person} from '../../api/types/cat/person';

const CatUserBanner: React.FC<CatUserBannerType> = ({person, style}) => {
  const avatarStyle = {
    backgroundColor: Person.getBackgroundColour(person) ?? undefined,
  };
  const foregroundColor = Person.getTextColour(person);

  return (
    <View style={[styles.container, style]}>
      {person.initials !== undefined && person.initials.length > 0 ? (
        <Avatar.Text
          size={40}
          color={foregroundColor}
          label={person.initials}
          style={avatarStyle}
        />
      ) : (
        <Avatar.Icon
          size={40}
          style={avatarStyle}
          color={foregroundColor}
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
