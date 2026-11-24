/**
 * Revisa que ningún enlace interno del build (dist/) lleve a una página
 * inexistente. Uso: npm run build && node scripts/verificar-enlaces.mjs
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const paginas = [];
const recorrer = (dir) => {
	for (const f of readdirSync(dir)) {
		const p = join(dir, f);
		if (statSync(p).isDirectory()) recorrer(p);
		else if (p.endsWith('.html')) paginas.push(p);
	}
};
recorrer(DIST);

const existe = (ruta) => {
	const limpia = decodeURI(ruta.split(/[?#]/)[0]);
	const base = join(DIST, limpia);
	return [base, join(base, 'index.html'), `${base}.html`].some((c) => existsSync(c) && statSync(c).isFile());
};

const rotos = [];
let total = 0;
for (const p of paginas) {
	const html = readFileSync(p, 'utf8');
	for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
		total++;
		if (!existe(href)) rotos.push(`${p} → ${href}`);
	}
}

console.log(`${paginas.length} páginas, ${total} enlaces internos revisados.`);
if (rotos.length) {
	console.error(`Enlaces rotos (${rotos.length}):\n${rotos.join('\n')}`);
	process.exit(1);
}
console.log('Sin enlaces rotos.');
