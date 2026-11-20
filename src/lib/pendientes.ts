/**
 * Verificador de datos PENDIENTE.
 *
 * Busca "PENDIENTE" en site.ts y en todas las colecciones, y las entradas
 * marcadas con pendiente: true.
 * - En desarrollo (npm run dev): solo avisa en la terminal. Nunca rompe.
 * - En producción (npm run build): lanza un error con la lista completa,
 *   para que no se publique un sitio con datos sin confirmar.
 *
 * Salida de emergencia para builds de prueba (medir rendimiento, probar CSP):
 *   COPAL_PERMITIR_PENDIENTES=1 npm run build
 * No lleva prefijo PUBLIC_: solo existe al compilar, nunca llega al navegador.
 */
import { getCollection, type CollectionKey } from 'astro:content';
import { SITE, PENDIENTE } from '../config/site';

const COLECCIONES: CollectionKey[] = [
	'platillos',
	'bebidas',
	'espacios',
	'especialistas',
	'clubVino',
	'eventos',
];

/** Rutas (ej. "nombre.es") de todos los valores PENDIENTE dentro de un objeto. */
function buscar(valor: unknown, ruta = ''): string[] {
	if (valor === PENDIENTE) return [ruta || '(valor)'];
	if (Array.isArray(valor)) return valor.flatMap((v, i) => buscar(v, `${ruta}[${i}]`));
	if (valor && typeof valor === 'object' && !(valor instanceof Date)) {
		return Object.entries(valor).flatMap(([k, v]) => buscar(v, ruta ? `${ruta}.${k}` : k));
	}
	return [];
}

async function listarPendientes(): Promise<string[]> {
	const lista: string[] = [];

	const enSitio = buscar(SITE);
	if (enSitio.length) lista.push(`site.ts → ${enSitio.join(', ')}`);

	for (const nombre of COLECCIONES) {
		for (const entrada of await getCollection(nombre)) {
			const { pendiente, ...datos } = entrada.data as Record<string, unknown>;
			const campos = buscar(datos);
			if (campos.length) lista.push(`${nombre}/${entrada.id} → ${campos.join(', ')}`);
			else if (pendiente) lista.push(`${nombre}/${entrada.id} → marcada pendiente: true`);
		}
	}
	return lista;
}

const permitir =
	import.meta.env.COPAL_PERMITIR_PENDIENTES === '1' || process.env.COPAL_PERMITIR_PENDIENTES === '1';

let verificacion: Promise<void> | undefined;

/** Se llama desde BaseLayout; corre una sola vez por build o arranque. */
export function verificarPendientes(): Promise<void> {
	verificacion ??= (async () => {
		const lista = await listarPendientes();
		if (lista.length === 0) return;

		const detalle = lista.map((l) => `  · ${l}`).join('\n');

		if (import.meta.env.PROD && !permitir) {
			throw new Error(
				`Hay ${lista.length} datos PENDIENTE sin confirmar. ` +
					`El sitio no se publica así:\n${detalle}\n\n` +
					`Para un build de prueba: COPAL_PERMITIR_PENDIENTES=1 npm run build`,
			);
		}

		console.warn(`\n[copal] ${lista.length} datos PENDIENTE (aviso, no bloquea):\n${detalle}\n`);
	})();
	return verificacion;
}
