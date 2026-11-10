import home from '../data/home.json';

/**
 * The homepage is bilingual: Spanish at `/`, English at `/en/`. Every other
 * page is still English-only, so `en` is the default wherever no language is
 * passed in.
 */
export type Lang = 'es' | 'en';

export const DEFAULT_LANG: Lang = 'en';

/** Homepage copy for one language. */
export function t(lang: Lang = DEFAULT_LANG) {
  return home[lang];
}

/** Where the homepage lives in each language. */
export function homePath(lang: Lang = DEFAULT_LANG): string {
  return lang === 'es' ? '/' : '/en/';
}

/** The other language, for the switch in the nav. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
