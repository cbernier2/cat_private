import i18next, {LanguageDetectorModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {findBestAvailableLanguage} from 'react-native-localize';

import {en, pt, registerTranslation} from 'react-native-paper-dates';
import ar from 'react-native-paper-dates/src/translations/ar';
import fr from 'react-native-paper-dates/src/translations/fr';
import moment from 'moment';
// TODO missing es, id, sv and tr
registerTranslation('ar', ar);
registerTranslation('en', en);
registerTranslation('fr', fr);
registerTranslation('pt', pt);

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
      en: {
        translation: {
          cat: require('./common/en.json'),
          ...require('./mobile/en.json'),
        },
      },
      fr: {
        translation: {
          cat: require('./common/fr.json'),
          ...require('./mobile/fr.json'),
        },
      },
    },
    nsSeparator: false,
  });

moment.locale(i18next.language);

export default i18next;
