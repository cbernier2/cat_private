import {CatSiteConfig, SiteConfig} from '../../../api/types';
import {ConfigItemName} from '../../../api/types/cat/config-item';
import {onConfigChange} from '../../../api/config';

export const transformConfig = (config: CatSiteConfig[]): SiteConfig => {
  const result: SiteConfig = {};
  config.forEach(item => {
    result[item.name as ConfigItemName] = item.value;
  });

  onConfigChange(result);

  return result;
};
