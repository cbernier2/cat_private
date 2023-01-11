import React from 'react';

import {CatSelectListType} from './types';
import {styles} from './styles';
import {Divider, TouchableRipple} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import CatText from '../text';
import useCatTheme from '../../hooks/useCatTheme';
import {HalfScreenModal} from '../half-screen-modal/Component';
import {isString} from 'lodash';

export const CatSelectList: React.FC<CatSelectListType> = ({
  visible,
  title,
  list,
  value,
  setValue,
  onDismiss,
  contentViewStyle,
}) => {
  const {colors} = useCatTheme();

  return (
    <HalfScreenModal
      visible={visible}
      onDismiss={onDismiss}
      contentStyle={contentViewStyle}>
      <View style={styles.container}>
        <CatText style={styles.titleText} variant={'titleLarge'}>
          {title}
        </CatText>
        <ScrollView bounces={false}>
          {list.map((item, _index) => (
            <View key={item.value}>
              <TouchableRipple
                onPress={() => {
                  setValue(item.value);
                  if (onDismiss) {
                    onDismiss();
                  }
                }}>
                <>
                  {isString(item.label) ? (
                    <CatText
                      variant={'titleMedium'}
                      style={[
                        styles.itemText,
                        {
                          color:
                            item.value === value ? colors.primary : colors.text,
                        },
                      ]}>
                      {item.label}
                    </CatText>
                  ) : (
                    item.label
                  )}
                </>
              </TouchableRipple>
              <Divider bold={true} />
            </View>
          ))}
        </ScrollView>
      </View>
    </HalfScreenModal>
  );
};
