import {SiteConfig} from './types';
import {ConfigItemName} from './types/cat/config-item';
import moment from 'moment-timezone';
import {UnitUtils} from '../utils/unit-utils';

export const onConfigChange = (config: SiteConfig) => {
  if (config[ConfigItemName.SETTINGS_LOCALIZATION_TIMEZONE]) {
    moment.tz.setDefault(config[ConfigItemName.SETTINGS_LOCALIZATION_TIMEZONE]);
  }
  if (config[ConfigItemName.SETTINGS_LOCALIZATION_UNIT_SYSTEM]) {
    UnitUtils.setLocalUnitSystem(
      config[ConfigItemName.SETTINGS_LOCALIZATION_UNIT_SYSTEM],
    );
  }
  if (config[ConfigItemName.SITE_CRS_UNIT]) {
    UnitUtils.setCrsUnit(config[ConfigItemName.SITE_CRS_UNIT]);
  }
  if (config[ConfigItemName.SITE_SUBSCRIPTIONS]) {
    // TODO: this.siteSubscriptionService.setSubscriptions(configItem.value);
  }
};
