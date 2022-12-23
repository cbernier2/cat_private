import {CatEquipmentSummaryWithObservations} from '../../../../redux/site/helpers/transformSummaries';

export interface EquipmentListType {
  equipments: CatEquipmentSummaryWithObservations[];
  withSiteStopsRow?: boolean;
}
