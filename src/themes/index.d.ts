import {ThemeOverride} from './index';

// Inject custom properties in definition
declare global {
  namespace ReactNativePaper {
    interface Theme extends ThemeOverride {}
  }
}
