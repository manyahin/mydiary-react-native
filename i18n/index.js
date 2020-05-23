import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { en, ru } from './langs';

i18n.fallbacks = true;
i18n.translations = { en, ru };

i18n.locale = Localization.locale;

const { t } = i18n;

export { i18n, t };
