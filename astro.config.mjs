// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';

// PUBLIC_SITE_URL: dominio público del sitio (por ahora el de Vercel, PENDIENTE).
// Se usa para URLs absolutas (canonical y hreflang). No es un secreto.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: PUBLIC_SITE_URL || 'http://localhost:4321',

	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
		},
	},

	// "/" no tiene contenido propio: manda al español (idioma por defecto).
	redirects: {
		'/': '/es/',
	},

	// Las fuentes se descargan al compilar y se sirven desde nuestro dominio:
	// el navegador del visitante nunca contacta a Google.
	// Rediseño «mezcla»: 4 familias, recortadas a lo que se usa
	// (pesos, estilos y ejes) para que pesen lo menos posible.
	fonts: [
		// Texto de todo el sitio: párrafos, menú, botones, formularios.
		{
			provider: fontProviders.google(),
			name: 'Instrument Sans',
			cssVariable: '--font-texto',
			weights: ['400 600'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		// Marca y títulos: Newsreader romana (400) en tamaño óptico de display.
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-titulos',
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
			options: { experimental: { variableAxis: { opsz: ['72'] } } },
		},
		// …y su itálica fina (lemas, citas y la voz del Wine bar).
		{
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-titulos',
			weights: [300],
			styles: ['italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
			options: { experimental: { variableAxis: { opsz: ['72'] } } },
		},
		// Voz de la Cocina: tipo de madera, rótulo de mercado.
		{
			provider: fontProviders.google(),
			name: 'Ultra',
			cssVariable: '--font-cocina',
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Rockwell', 'Georgia', 'serif'],
		},
		// Voz del Bar: alta y condensada, letrero de neón.
		{
			provider: fontProviders.google(),
			name: 'Big Shoulders',
			cssVariable: '--font-bar',
			weights: [800],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Impact', 'sans-serif'],
			options: { experimental: { variableAxis: { opsz: ['72'] } } },
		},
	],
});
