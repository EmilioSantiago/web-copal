/**
 * Colecciones de contenido de Copal.
 *
 * Cada colección vive en un archivo YAML de src/content/ y se valida con Zod:
 * si un dato no tiene la forma esperada, Astro avisa con un error claro.
 *
 * Reglas:
 * - Todo texto visible es bilingüe: { es, en }.
 * - Lo que Copal no ha confirmado se escribe "PENDIENTE" (y la entrada lleva
 *   pendiente: true). El build de producción falla mientras quede alguno;
 *   ver src/lib/pendientes.ts.
 * - Las fotos se validan con image(): si la ruta no existe, el build falla.
 */
import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const PENDIENTE = z.literal('PENDIENTE');

/** Texto en los dos idiomas. */
const bilingue = z.object({
	es: z.string().min(1),
	en: z.string().min(1),
});

/** Un número confirmado o PENDIENTE (capacidades, por ejemplo). */
const numeroOPendiente = z.union([z.number().int().positive(), PENDIENTE]);

/** Áreas del restaurante. No hay terraza: el exterior es el patio. */
const area = z.enum(['patio', 'bar', 'wine-bar', 'salon-privado', 'cocina']);

/** Marca de "esta entrada aún no está confirmada". */
const pendiente = z.boolean().default(false);

const platillos = defineCollection({
	loader: file('src/content/platillos.yaml'),
	schema: ({ image }) =>
		z.object({
			tiempo: z.enum(['entradas', 'ensaladas', 'fuertes', 'postres']),
			nombre: bilingue,
			descripcion: bilingue,
			/** Precio en pesos (MXN). Opcional: si no está, la página no lo muestra. */
			precio: z.union([z.number().positive(), PENDIENTE]).optional(),
			foto: z.object({ src: image(), alt: bilingue }).optional(),
			orden: z.number().int().default(0),
			pendiente,
		}),
});

const bebidas = defineCollection({
	loader: file('src/content/bebidas.yaml'),
	schema: ({ image }) =>
		z.object({
			area: z.enum(['bar', 'wine-bar']),
			tipo: z.enum(['coctel', 'vino', 'otra']),
			nombre: bilingue,
			/** "Bebidas con historia": de dónde viene, qué cuenta. */
			historia: bilingue,
			foto: z.object({ src: image(), alt: bilingue }).optional(),
			orden: z.number().int().default(0),
			pendiente,
		}),
});

const espacios = defineCollection({
	loader: file('src/content/espacios.yaml'),
	schema: ({ image }) =>
		z.object({
			area,
			nombre: bilingue,
			descripcion: bilingue,
			capacidad: numeroOPendiente.optional(),
			/** Se puede pedir en las notas de la reserva de OpenTable. */
			reservable: z.boolean(),
			/** Texto del botón fijo en celular, ej. "Reservar en el patio". */
			reservarTexto: bilingue.optional(),
			/** Sin foto todavía (ej. salón privado): la página lo muestra sin imagen. */
			foto: z.object({ src: image(), alt: bilingue }).optional(),
			orden: z.number().int().default(0),
			pendiente,
		}),
});

const especialistas = defineCollection({
	loader: file('src/content/especialistas.yaml'),
	schema: ({ image }) =>
		z.object({
			nombre: z.string().min(1),
			rol: bilingue,
			area: z.enum(['cocina', 'bar', 'wine-bar']),
			bio: bilingue,
			foto: z.object({ src: image(), alt: bilingue }),
			pendiente,
		}),
});

const clubVino = defineCollection({
	loader: file('src/content/club-vino.yaml'),
	schema: ({ image }) =>
		z.object({
			estado: z.enum(['proxima', 'pasada']),
			titulo: bilingue,
			/** Fecha ISO (AAAA-MM-DD) o PENDIENTE. */
			fecha: z.union([z.iso.date(), PENDIENTE]),
			/** Bodegas, productores o invitados. PENDIENTE hasta confirmar. */
			colaboradores: z.union([z.array(z.string().min(1)), PENDIENTE]),
			descripcion: bilingue,
			fotos: z.array(z.object({ src: image(), alt: bilingue })).default([]),
			pendiente,
		}),
});

const eventos = defineCollection({
	loader: file('src/content/eventos.yaml'),
	schema: ({ image }) =>
		z.object({
			nombre: bilingue,
			descripcion: bilingue,
			/** Espacios donde puede hacerse (ids de la colección espacios). */
			espacios: z.array(reference('espacios')).default([]),
			foto: z.object({ src: image(), alt: bilingue }).optional(),
			orden: z.number().int().default(0),
			pendiente,
		}),
});

export const collections = { platillos, bebidas, espacios, especialistas, clubVino, eventos };
