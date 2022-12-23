import {StackScreenProps} from '@react-navigation/stack';

export type AddEditObservationScreenType = StackScreenProps<any>;

export type AddEditObservationParams = {
  equipmentId?: string;
  observationId?: string;
};
