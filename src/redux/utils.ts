import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';

export const catPersistReducer = <T>(
  config: Omit<Parameters<typeof persistReducer<T>>[0], 'storage' | 'version'>,
  typedReducer: Parameters<typeof persistReducer<T>>[1],
) =>
  persistReducer(
    {
      storage: AsyncStorage,
      version: 2,
      transforms: [
        ...(config.transforms ?? []),
        encryptTransform({
          secretKey: 'hojazhTYDzLTZ6qt77Q9U7AfJaMQ99V4',
        }),
      ],
      ...config,
    },
    typedReducer,
  );
