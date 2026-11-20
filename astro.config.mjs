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
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Gloock',
			cssVariable: '--font-titulos',
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Hanken Grotesk',
			cssVariable: '--font-texto',
			weights: ['100 900'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
	],
});
