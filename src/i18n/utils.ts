import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale && currentLocale in languages ? (currentLocale as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key];
}

/** Root path of the home page for a language (`/` or `/en/`). */
export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}
