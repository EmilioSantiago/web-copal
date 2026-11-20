/**
 * Tabla de rutas por idioma. Cada página tiene una clave estable
 * y una URL por idioma. El selector de idioma y las etiquetas hreflang
 * usan esta tabla para enlazar la MISMA página en el otro idioma.
 */

export const languages = {
	es: 'Español',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

export const routes = {
	inicio: { es: '/es/', en: '/en/' },
	cocina: { es: '/es/cocina', en: '/en/kitchen' },
	bar: { es: '/es/bar', en: '/en/bar' },
	wineBar: { es: '/es/wine-bar', en: '/en/wine-bar' },
	eventos: { es: '/es/eventos-privados', en: '/en/private-events' },
	visitanos: { es: '/es/visitanos', en: '/en/visit' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
