import es from './es.json';
import en from './en.json';
import { defaultLang, langs, routes, type Lang, type RouteKey } from './routes';

const ui = { es, en } as const;

/** Claves de traducción válidas: el español es la referencia. */
export type UIKey = keyof typeof es;

/**
 * Devuelve una función t('clave') para el idioma dado.
 * Si falta una traducción en inglés, cae al español en lugar de romper.
 */
export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
	};
}

/** URL de una página en un idioma. */
export function pathFor(route: RouteKey, lang: Lang): string {
	return routes[route][lang];
}

/** URLs de la misma página en todos los idiomas (para hreflang y el selector). */
export function alternatesFor(route: RouteKey): { lang: Lang; path: string }[] {
	return langs.map((lang) => ({ lang, path: routes[route][lang] }));
}

export function isLang(value: unknown): value is Lang {
	return typeof value === 'string' && (langs as string[]).includes(value);
}
