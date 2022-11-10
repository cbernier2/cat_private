import {CatConfig} from './types';
import {ConfigItemName} from './types/cat/config-item';
import moment from 'moment-timezone';
import {UnitUtils} from '../utils/unit-utils';

export const onConfigChange = (config: CatConfig) => {
  if (config[ConfigItemName.SETTINGS_LOCALIZATION_TIMEZONE]?.value) {
    moment.tz.setDefault(
      config[ConfigItemName.SETTINGS_LOCALIZATION_TIMEZONE]?.value,
    );
  }
  if (config[ConfigItemName.SETTINGS_LOCALIZATION_UNIT_SYSTEM]?.value) {
    UnitUtils.setLocalUnitSystem(
      config[ConfigItemName.SETTINGS_LOCALIZATION_UNIT_SYSTEM]?.value,
    );
  }
  if (config[ConfigItemName.SITE_CRS_UNIT]?.value) {
    UnitUtils.setCrsUnit(config[ConfigItemName.SITE_CRS_UNIT]?.value);
  }
  if (config[ConfigItemName.SITE_SUBSCRIPTIONS]?.value) {
    // TODO: this.siteSubscriptionService.setSubscriptions(configItem.value);
  }
};
