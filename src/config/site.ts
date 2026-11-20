/**
 * Datos del restaurante. Una sola fuente de verdad para todo el sitio.
 *
 * Regla: no inventar datos. Lo que no esté confirmado por Emilio
 * queda como PENDIENTE y la UI debe tratarlo como "aún no disponible".
 * Aquí no van secretos: todo lo de este archivo termina en el navegador.
 */

export const PENDIENTE = 'PENDIENTE' as const;
export type Pendiente = typeof PENDIENTE;

export const esPendiente = (valor: unknown): valor is Pendiente => valor === PENDIENTE;

export const SITE = {
	name: 'COPAL',
	city: 'Oaxaca de Juárez',

	/** Todos los botones "Reservar" leen esta URL. */
	openTableUrl: 'https://www.opentable.com.mx/r/copal-oaxaca-de-juarez',

	/** Número en formato internacional sin "+" ni espacios (ej. 52951…). */
	whatsapp: PENDIENTE as string,
	telefono: PENDIENTE as string,
	email: PENDIENTE as string,
	direccion: PENDIENTE as string,
	googleMapsUrl: PENDIENTE as string,
	instagram: PENDIENTE as string,
} as const;
