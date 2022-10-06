import i18next, {LanguageDetectorModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {findBestAvailableLanguage} from 'react-native-localize';

const detectLanguage: () => string | undefined = () => {
  return findBestAvailableLanguage(['en', 'fr'])?.languageTag;
};

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguage,
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: {translation: require('./json/en.json')},
      fr: {translation: require('./json/fr.json')},
    },
    nsSeparator: false,
  });

export default i18next;
