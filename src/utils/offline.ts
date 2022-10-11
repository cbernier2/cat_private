import type {AsyncThunkPayloadCreator} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import type {Dispatch} from 'redux';

declare type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
};

declare type OfflineOptions = {
  interceptInOffline?: boolean;
  meta?: {
    retry?: boolean;
    dismiss?: Array<string>;
    name?: string;
    args?: any[];
  };
};

const defaultOfflineOptions: OfflineOptions = {
  interceptInOffline: true,
  meta: {
    retry: true,
    dismiss: [],
  },
};

export const createOfflineAsyncThunk = <
  Returned,
  ThunkArg = void,
  ThunkApiConfig extends AsyncThunkConfig = {},
>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: {
    // createAsyncThunk doesn't expose its argument types (actually,
    // they don't expose a lot of their types)... so it will be any.
    asyncOptions?: any;
    offlineOptions?: OfflineOptions;
  },
) => {
  const thunk = createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
    typePrefix,
    payloadCreator,
    options?.asyncOptions,
  );

  return Object.assign((arg: ThunkArg) => {
    return Object.assign(
      thunk(arg),
      thunk,
      defaultOfflineOptions,
      options?.offlineOptions || {},
      {
        meta: {
          ...defaultOfflineOptions.meta,
          ...(options?.offlineOptions?.meta || {}),
          name: typePrefix,
          args: [arg],
        },
      },
    ) as typeof thunk;
  }, thunk);
};
