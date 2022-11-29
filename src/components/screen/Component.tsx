import React, {useCallback, useRef, useState} from 'react';
import {CatScreenType} from './types';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const CatScreen: React.FC<CatScreenType> = ({
  children,
  title,
  scroll = true,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useFocusEffect(
    useCallback(() => {
      if (title) {
        navigation.getParent()?.getParent()?.setOptions({
          title,
        });
      }
    }, [navigation, title]),
  );

  const [showDebugTapCount, setShowDebugTapCount] = useState(0);
  const resetShowDebugTapCount = useRef<NodeJS.Timeout>();
  const onPressTrigger = () => {
    const clearTapCountTimeout = () => {
      if (resetShowDebugTapCount.current) {
        clearTimeout(resetShowDebugTapCount.current);
        resetShowDebugTapCount.current = undefined;
      }
    };
    clearTapCountTimeout();
    if (showDebugTapCount >= 3) {
      navigation.navigate('Debug');
      setShowDebugTapCount(0);
    } else {
      setShowDebugTapCount(showDebugTapCount + 1);
      resetShowDebugTapCount.current = setTimeout(() => {
        setShowDebugTapCount(0);
        resetShowDebugTapCount.current = undefined;
      }, 1000);
    }
    return clearTapCountTimeout;
  };

  return (
    <View style={[styles.background]}>
      <TouchableWithoutFeedback onPress={onPressTrigger}>
        <View style={styles.triggerContainer} />
      </TouchableWithoutFeedback>
      {scroll ? (
        <ScrollView alwaysBounceVertical={false}>
          <View style={styles.scrollViewContent}>{children}</View>
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

export default CatScreen;
