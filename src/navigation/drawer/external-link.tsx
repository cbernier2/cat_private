import React from 'react';
import {Linking} from 'react-native';

import {CatMenuItem} from './MenuItem';
import {ExternalLinkType} from './types';

export const CatExternalLink: React.FC<ExternalLinkType> = props => {
  const {url, ...rest} = props;

  const onPress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      // TODO What do?
      //  Should we have a global toast notification for generic errors like this one?
      //  Would probably also be useful later when we get to the observation Post
      //   portion of the app
    }
  };

  return <CatMenuItem {...rest} onPress={onPress} />;
};
