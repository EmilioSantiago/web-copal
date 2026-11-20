# Copal · sitio web

Sitio del restaurante Copal (Oaxaca de Juárez). Astro + TypeScript, en español
e inglés (`/es/` y `/en/`).

## Comandos

| Comando           | Qué hace                                               |
| :---------------- | :----------------------------------------------------- |
| `npm install`     | Instala dependencias                                   |
| `npm run dev`     | Servidor local en `localhost:4321`                      |
| `npm run build`   | Compila el sitio en `./dist/` (falla si hay PENDIENTE) |
| `npm run preview` | Sirve el build localmente antes de publicar            |

## Datos PENDIENTE

Lo que Copal aún no confirma (horarios, teléfonos, nombres de platillos,
fechas del Club del Vino, etc.) se escribe `PENDIENTE` en `src/config/site.ts`
o en las colecciones de `src/content/`.

- En `npm run dev` solo aparece un aviso en la terminal.
- En `npm run build` el build **falla** y lista cada dato pendiente.
  Así nunca se publica el sitio con información sin confirmar.

### Builds de prueba: `COPAL_PERMITIR_PENDIENTES=1`

Para medir rendimiento o probar la CSP antes de tener todos los datos:

```sh
COPAL_PERMITIR_PENDIENTES=1 npm run build
```

> ⚠️ **Nunca se activa en producción.** En Vercel, esta variable **no** debe
> existir en el entorno *Production*. Si alguna vez se necesita para una vista
> previa, se agrega solo al entorno *Preview* y se borra al terminar.
> No lleva prefijo `PUBLIC_`, así que nunca llega al navegador.

## Estructura

```text
src/
├── assets/        fotos (photos/) y logo (logo/)
├── components/    layout, reserva, secciones, ui
├── config/        site.ts: datos del restaurante
├── content/       colecciones en YAML
├── i18n/          es.json, en.json, routes.ts, utils.ts
├── layouts/       BaseLayout.astro
├── lib/           pendientes.ts
├── pages/         es/ y en/ (tres líneas cada página)
├── styles/        tokens.css y global.css
└── views/         una vista por página, recibe el idioma
```
