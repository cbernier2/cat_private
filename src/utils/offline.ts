import type {Dispatch} from 'redux';
import {createTransform} from 'redux-persist';
import type {AsyncThunkPayloadCreator} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunk} from '@reduxjs/toolkit/src/createAsyncThunk';

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
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => {
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
  }, thunk) as typeof thunk;
};

export const networkTransform = (actions: object) =>
  createTransform(
    (inboundState: any) => {
      const actionQueue: any[] = [];
      console.log('inbound', JSON.stringify(inboundState));

      inboundState.actionQueue.forEach((action: any) => {
        if (typeof action === 'function') {
          actionQueue.push({
            function: action.meta.name,
            args: action.meta.args,
          });
        } else if (typeof action === 'object') {
          actionQueue.push(action);
        }
      });

      return {
        ...inboundState,
        actionQueue,
      };
    },
    (outboundState: any) => {
      const actionQueue: any[] = [];
      console.log('outbound', JSON.stringify(outboundState));

      outboundState.actionQueue.forEach((action: any) => {
        if (action.function) {
          // @ts-ignore
          const actionFunction = actions[action.function];
          actionQueue.push(actionFunction(...action.args));
        } else {
          actionQueue.push(action);
        }
      });

      return {...outboundState, actionQueue};
    },
    {whitelist: ['network']},
  );
