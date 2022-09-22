import {lightTheme} from '../lightTheme';

export interface ThemePreferencesContextInterface {
  isThemeDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}
