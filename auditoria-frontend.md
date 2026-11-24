# Auditoría de diseño y copy: web Copal

> Informe del agente revisor (diseñador front-end senior), noviembre 2026.
> **Decisiones del cliente que cambian este informe** (mandan sobre lo de abajo):
> - Las páginas internas NO se quitan del menú: se construyen (ver recomendación #1).
> - "Visítanos" se elimina; "Eventos privados" pasa a ser "Contacto" e incluye la renta del lugar para eventos privados.
> - La home ya no usa fotos de platillos ni bebidas; la tira de comida sale de la home y pasa a Cocina.
> - No se muestran precios en el sitio.

---

## 1. Diagnóstico general

**Lo que funciona:**
- La paleta sale del lugar real (noche, farol, barro, cempasúchil) y los contrastes están medidos.
- Las fotos son reales y muy buenas.
- La idea de una voz tipográfica por área funciona muy bien en el índice Cocina / Bar / Wine bar.
- La base de accesibilidad es mejor que la de la mayoría de los sitios de restaurante: enlace para saltar al contenido, foco visible, `<dialog>`, movimiento reducido, `inert` en el botón fijo.

**Lo que la hace ver genérica:**
- El hero repite la fórmula de siempre: palabra enorme, lema en itálica y dos botones.
- El titular resalta una sola frase con otro color, «a la sierra» en naranja. frontend-design lo marca como el error tipográfico más típico de una página generada.
- Hay unos 10 efectos sueltos: grano, farol que respira, velo, brasas, revelado con clip-path, fondos que cambian de color, tira fijada, fotos que se encienden, giro al pasar el cursor y marcos desplazados. Ninguno manda.
- Lo más grave no es de diseño: las 5 páginas del menú dan 404 y el inicio no tiene horario ni dirección. Es justo lo que alguien busca en el sitio de un restaurante.

**Dirección que propongo: «Resina y brasa»**
1. **Un solo ritual de luz.** La hoja que se enciende como brasas es la firma. Solo eso se mueve sin que la persona haga algo; lo demás queda quieto o responde a la persona.
2. **La foto manda, sin adornos.** Imágenes a sangre y sin marcos naranjas en cada una. El marco desplazado se usa una vez en todo el inicio.
3. **Newsreader manda; las voces de área solo en el nombre del área.** Ultra y Big Shoulders aparecen solo en «Cocina» y «Bar». La itálica queda para el Wine bar y una sola cita.
4. **Lo práctico se muestra con orgullo.** Horario, dirección y cómo llegar, escritos con la misma voz, cerca de cada «Reservar».

---

## 2. Top 10 mejoras por impacto

### 1. Páginas del menú que dan 404
- **Qué cambiar:** /es/cocina, /es/bar, /es/wine-bar, /es/eventos-privados, /es/visitanos y sus versiones en inglés dan 404. Créalas, aunque sea con las colecciones que ya existen y PENDIENTE, o quita los enlaces mientras tanto. Ojo: el commit addce47 dice «página Visítanos», pero no hay ningún archivo en src/pages/.
- **Por qué:** Hoy el menú principal, el índice, el footer y «Horarios, ubicación y contacto» llevan a error. Eso le resta más profesionalismo que cualquier detalle visual.
- **Archivos:** src/pages/es/\*, src/pages/en/\*, src/views/\*
- **Esfuerzo:** Alto · **Skill:** landing-page (A8: «no clear next step»)
- **Decisión del cliente:** construirlas, no quitar los enlaces. Eventos privados → Contacto; Visítanos se elimina.

### 2. Datos para visitar en el inicio
- **Qué cambiar:** una franja con horario, dirección, mapa y WhatsApp junto al bloque de reserva, usando PENDIENTE mientras no estén.
- **Por qué:** Es lo primero que busca quien va a reservar. Hoy solo aparece en el footer, como «Pendiente».
- **Archivos:** ReservaBlock.astro, config/site.ts
- **Esfuerzo:** Medio (requiere datos) · **Skill:** landing-page A2
- **Decisión del cliente:** la info completa vive en Contacto; en la home basta una línea con el horario y un enlace a Contacto.

### 3. Un solo momento de movimiento
- **Qué cambiar:** quedarse con las brasas de la hoja en el hero y el revelado de las fotos. Quitar `.farol-respira`, que es una animación infinita y fija, y el `.grano` en celular. Quitar el giro de la miniatura al pasar el cursor.
- **Por qué:** frontend-design: «A single orchestrated moment lands better than scattered effects» y «Spend your boldness in one place». Además, el grano fijo con mix-blend-mode y el farol infinito obligan a repintar todo el tiempo en celular.
- **Archivos:** global.css:157-196, BaseLayout.astro:71-72, Adelantos.astro:107-111
- **Esfuerzo:** Medio · **Skill:** frontend-design

### 4. Concepto: un color y una repetición de más
- **Qué cambiar:** quitar el color de una sola frase y dejar de repetir «de la costa a la sierra», que aparece 4 veces (meta, lema, H2 y cita).
- **Por qué:** Resaltar una frase con otro color es el ejemplo exacto que da frontend-design. Y la repetición le quita fuerza a la idea.
- **Archivos:** Concepto.astro:70-73, es.json:2,29,31,45-46
- **Esfuerzo:** Bajo · **Skill:** frontend-design

### 5. Patio: palabra en contorno
- **Qué cambiar:** quitar la palabra «Patio» en contorno. Repite el H2 y casi no se lee sobre la foto de lámparas. Usar el espacio vacío bajo el texto de la columna derecha.
- **Por qué:** Es decoración que no informa. En escritorio, la columna 9–12 queda vacía bajo el párrafo.
- **Archivos:** Patio.astro:33, 66-78, 126-130, es.json:47
- **Esfuerzo:** Bajo · **Skill:** frontend-design («cut any decoration that does not serve the brief»)

### 6. Tira fijada
- **Qué cambiar:** no fijarla mientras no haya nombres de platillos. Hoy se fija toda la pantalla para mostrar 6 fotos con etiquetas como «Postres» o «Bar». Mientras tanto, mejor un carrusel normal o una cuadrícula irregular.
- **Por qué:** Gasta unas 3 pantallas de scroll en poca información. El scroll horizontal con pin solo se justifica cuando hay algo que leer en cada parada.
- **Archivos:** HomeView.astro:73-96, Tira.astro
- **Esfuerzo:** Medio · **Skill:** gsap-scrolltrigger (Pinning, matchMedia)
- **Decisión del cliente:** la tira sale de la home y pasa a Cocina, ya con nombres y descripciones de platillos.

### 7. Textos del índice y del bloque de reserva
- **Qué cambiar:** reescribirlos (ver tabla de copy).
- **Por qué:** «Bebidas con historia», «Reserva tu mesa» y «Entradas, ensaladas, fuertes y postres» describen a cualquier restaurante.
- **Archivos:** es.json, en.json
- **Esfuerzo:** Bajo · **Skill:** frontend-design («More on writing») + landing-page A5

### 8. Cómo se ve al compartir y en buscadores
- **Qué cambiar:** og:image, twitter:card, apple-touch-icon, un favicon con los colores de la marca, un `<title>` con «restaurante» y JSON-LD Restaurant.
- **Por qué:** Hoy, compartido por WhatsApp o Instagram, el enlace sale sin imagen. El favicon es un círculo negro con la hoja en blanco, sin nada de farol.
- **Archivos:** BaseLayout.astro:29, 52-60, public/
- **Esfuerzo:** Bajo–medio

### 9. Fotos a plena luz
- **Qué cambiar:** `.enciende` deja las fotos al 80 % de brillo en escritorio, así que se ven apagadas hasta pasar el cursor. Además, en el índice solo el H3 es enlace.
- **Por qué:** Las fotos deben verse bien sin interacción. Si toda la fila reacciona al cursor, toda la fila debería poder clicarse.
- **Archivos:** global.css:275-284, Adelantos.astro
- **Esfuerzo:** Bajo · **Skill:** frontend-design

### 10. Itálica y número de familias
- **Qué cambiar:** hoy la itálica aparece en el lema, la cita, el titular de concepto, el título de la tira y el Wine bar, así que ya no distingue al Wine bar. Ultra se usa en «El patio y la parrilla», que no es la Cocina.
- **Por qué:** frontend-design recomienda 1–2 familias claramente distintas. Las 4 están aprobadas, pero rinden más si cada una aparece solo donde le toca.
- **Archivos:** Tira.astro:36, Hero.astro:47, Patio.astro:40
- **Esfuerzo:** Medio (decisión del cliente) · **Skill:** frontend-design

---

## 3. Diseño por sección

### Header
- Está bien resuelto: se oculta al bajar, tiene foco visible y «Reservar» es el único botón naranja.
- En escritorio hay 7 elementos en la barra. Si mueves «English» al footer y al menú móvil, «Reservar» respira más.
- El logo con «COPAL» espaciado (0.12em) y el hero con «COPAL» enorme repiten la misma palabra en la primera pantalla. Opción: ocultar el texto del logo mientras se ve el hero y dejar solo la hoja.

### Hero (Hero.astro)
- La foto del detalle (`.hero-detalle`, la lámpara vista desde abajo) queda como una miniatura flotando sobre el borde de la foto principal y le compite a la lámpara grande. Recomiendo quitarla y pasarle esa fuerza a la hoja.
- La hoja con brasas es la firma, pero en móvil mide 50 px y queda casi pegada a «COPAL» (470–542 px contra 558 px). Propuesta: que sea el centro del momento de carga, más grande (`--alto-hoja: clamp(6rem, 4rem + 8vw, 11rem)`), y que el texto aparezca cuando termina la última elipse. La hoja ya dura 0.45 s + 0.45 s; el lema y los botones podrían entrar con `animation-delay: 0.9s`.
- H1 = «COPAL» le dice poco al buscador. Mantén la palabra visible y agrega contexto oculto:

```astro
<h1 id="hero-titulo" class="hero-nombre voz-marca">
  {SITE.name}<span class="sr-only">, {t('inicio.h1Contexto')}</span>
</h1>
```
  Por ejemplo: «restaurante en Oaxaca de Juárez».
- Lema: ver la tabla de copy. Hoy repite el titular de la sección siguiente.
- «Visítanos» como botón secundario está bien porque no compite. Pero hoy lleva a un 404. *(Decisión del cliente: Visítanos se elimina; el botón secundario debe llevar a otra página que sí exista, como Contacto.)*

### Concepto (Concepto.astro)
- El recorte en forma de hoja (`.mascara-hoja`) es el mejor detalle propio del sitio: sale directo del logo. Consérvalo.
- Hay que quitar `color: var(--c-farol)` de `.concepto-titular .italica`. La itálica sola ya marca el cambio de línea. Si quieres más contraste, cambia el tamaño, no el color.
- Hay tres niveles de texto: el H2, la cita en itálica de unos 34 px y el párrafo en `--texto-suave`. Con dos basta: el H2 y un párrafo de dos frases.

### Patio (Patio.astro)
- La palabra «Patio» en contorno y el H2 «El patio y la parrilla» dicen lo mismo. Quita la palabra en contorno.
- En escritorio, el bloque de texto (col 9–12) ocupa solo la parte de arriba. Debajo cabe una nota práctica en Instrument Sans 500: «Pide mesa en el patio al reservar». Es el mismo texto del botón fijo móvil, y así el escritorio también lo ve.
- El H2 en Ultra hace que el patio «suene» a Cocina. Si quieres respetar «una voz por área», usa Newsreader 400 y deja Ultra solo para la palabra «Cocina».
- Los dos marcos naranjas (foto grande y parrillero) más el del hero ya suman tres. Deja uno solo en todo el inicio.

### Tira (Tira.astro + HomeView.astro)
- Mientras no haya nombres de platillos: quita el pin, deja el carrusel nativo con scroll-snap, que ya funciona sin JS, y reduce flex-basis a 22vw para que se vean 4 fotos y media en escritorio. Cuando lleguen los nombres, cada etiqueta puede llevar nombre y tiempo: «[Nombre del platillo] · Fuertes».
- Si conservas el pin, la skill gsap-scrolltrigger sugiere `snap: 1 / (items - 1)` para que cada foto quede centrada y no a medias.
- Las etiquetas «Bar» y «Wine bar» encima de las fotos parecen enlaces, pero no lo son.
- *(Decisión del cliente: la tira sale de la home y pasa a Cocina.)*

### Índice de áreas (Adelantos.astro)
- Es la sección más lograda: las tres voces se ven distintas y con sentido. Ojalá todo el sitio tuviera ese nivel.
- Toda la fila debería poder clicarse con un enlace estirado:

```css
.indice-fila { position: relative; }
.indice-nombre a::after { content: ''; position: absolute; inset: 0; }
```
- Quita el giro de la miniatura al pasar el cursor. Ya se enciende la foto y cambia el color del título; tres efectos a la vez es demasiado.
- Los textos de la columna central son listas de categorías. Ver la tabla de copy.

### Reserva (ReservaBlock.astro)
- La banda en barro con luz de farol cierra bien. Le falta información: el horario y el «cómo llegar» (que ahora es un 404) deberían ir aquí como texto, no solo como enlace.
- Con «Reservamos por OpenTable» el texto empieza por la herramienta y no por la persona.

### Footer (Footer.astro)
- Los enlaces miden 30 px de alto (medido), menos de los 44 px de `.idioma` y del botón Menú. Usa `.footer-columna a { min-height: 2.75rem; display: inline-flex; align-items: center; }`.
- «Páginas» y «Contacto» son etiquetas genéricas. frontend-design pide evitar etiquetas innecesarias sobre el contenido. «Contacto» sirve; «Páginas» se puede quitar.
- «Oaxaca de Juárez» aparece dos veces: bajo el logo y en el ©.

### Global
- **Color:** la paleta es buena; no se proponen cambios de hex. Lo que sobra es el gradiente radial suelto (`--resplandor`, `.farol-respira`, `.reserva::before`). Deja la luz radial solo en el bloque de reserva, que es donde «está el farol».
- **Easing:** `--curva: cubic-bezier(0.2, 0.7, 0.2, 1)` está bien. Para el revelado, `power3.inOut` en 1.2 s se siente lento; `power3.out` en 0.9 s se siente más como «encender».
- **Rendimiento:** las fotos suman 5.3 MB en origen, pero Foto.astro las sirve en AVIF/WebP a 400/800/1200. Bien resuelto.

---

## 4. Tabla de copy

Se mantiene el tú en todo el sitio; hoy ya es consistente.

| Archivo:línea | Texto actual | Problema | Propuesta A | Propuesta B |
|---|---|---|---|---|
| BaseLayout.astro:29 | COPAL · Oaxaca de Juárez | No dice qué es. Pierde la búsqueda «restaurante Oaxaca». | Copal · Restaurante en Oaxaca de Juárez | Copal · Cocina oaxaqueña a la leña, Oaxaca de Juárez |
| es.json:2 | Copal, restaurante en Oaxaca de Juárez. Cocina de la costa a la sierra, parrilla de leña en el patio, bar y wine bar. | Es una lista; «cocina de la costa a la sierra» no se entiende fuera de contexto. | Restaurante en Oaxaca de Juárez: cocina de la costa y la sierra a la leña, un patio bajo lámparas tejidas, bar y wine bar. Reserva por OpenTable. | Cocina oaxaqueña a la leña en un patio del centro de Oaxaca. Bar, wine bar y reservas en línea. (confirmar «centro» → falta dirección) |
| es.json:29 | Cocina de Oaxaca, de la costa a la sierra. | Repite el H2 que viene justo debajo. | Cocina oaxaqueña a la leña, en un patio bajo lámparas tejidas. | Aquí cocinamos con leña y cenamos bajo las lámparas. |
| es.json:45-46 | De la costa / a la sierra | Bien como idea, pero es la 3.ª vez que aparece. | Mantener (y quitar la frase del lema) | Del mar / al monte |
| es.json:31 | Oaxaca cabe en una mesa: el mar de la costa, los valles, el monte de la sierra. | Buena; «de la costa» y «de la sierra» repiten el H2. | Oaxaca cabe en una mesa: el mar, los valles y el monte. | Oaxaca entera, en una mesa: mar, valle y monte. |
| es.json:32 | Cocinamos ese viaje con fuego de leña. | «Viaje» es metáfora de folleto. | Todo pasa por la leña. | Lo cocinamos todo a la leña. (confirmar que sea «todo») |
| es.json:34 | El patio y la parrilla | Correcto pero plano. | La parrilla vive en el patio | Cenar junto al fuego |
| es.json:47 | Patio (contorno) | Repite el H2. | (eliminar) | — |
| es.json:38 | Explora Copal | «Explora» es de plantilla (aunque sea sr-only). | Las áreas de Copal | Cocina, bar y wine bar |
| es.json:39 | Entradas, ensaladas, fuertes y postres, con la parrilla al centro. | Describe la carta de cualquier restaurante. | Lo que sale de las brasas, de la entrada al postre. | La carta gira alrededor de la parrilla de leña. (falta: [platillo estrella]) |
| es.json:41 | Bebidas con historia y colaboraciones con otros bares. | «Bebidas con historia» es un cliché; «otros bares» es vago. | Coctelería de [ingrediente o destilado de la casa] y noches con bares invitados. | Una barra que recibe a otros bares: [nombre de una colaboración confirmada]. |
| es.json:43 | Vinos, una sommelier y el Club Social del Vino. | Lista; el nombre de la sommelier ya está confirmado en especialistas.yaml. | La cava de Laura Sánchez y las noches del Club Social del Vino. | Vino por copa frente a la cava, con Laura Sánchez. (confirmar «por copa») |
| es.json:48 | De la cocina y la barra | Bien. | Mantener | De las brasas y la barra |
| es.json:18 | Reserva tu mesa | Genérico. | Te guardamos una mesa | ¿Patio, barra o cava? |
| es.json:19 | Reservamos por OpenTable. Si quieres un espacio en particular, pídelo en las notas de tu reserva. | Empieza por la herramienta. | Elige día y hora en OpenTable. Si quieres el patio o el wine bar, escríbelo en las notas. | Reserva en un minuto por OpenTable. ¿Patio o wine bar? Anótalo al reservar. |
| es.json:14 | Reservar | Correcto. landing-page A5 pide verbo + qué obtienes. | Reservar mesa | Mantener (en header, por espacio) |
| es.json:20 | Horarios, ubicación y contacto | Bueno, pero lleva a un 404. | Mantener | Cómo llegar y horarios |
| es.json:27 | Copal, Oaxaca de Juárez. | Repite la ciudad del bloque de marca. | Copal | Copal · Restaurante |
| en.json:16 | Book in the patio | Poco natural en inglés. | Book a patio table | Book a table in the patio |
| en.json:35 | The wood-fire grill lives in the patio… | Bien. | Mantener | The wood-fire grill is out in the patio… |
| en.json:41 | Drinks with a story, and collaborations with other bars. | El mismo cliché. | Cocktails built on [house spirit], plus nights with guest bars. | — |

Ortografía y acentos: sin errores. Mayúsculas en tipo oración, correcto.

---

## 5. Banco de frases y vocabulario

**Frases** (todas usan datos que ya están en el código):
1. La parrilla vive en el patio.
2. Aquí el fuego se ve, se oye y se huele. (ya existe; es la mejor frase del sitio)
3. Cenar bajo las lámparas tejidas.
4. Todo pasa por la leña.
5. Del mar al monte, en una mesa.
6. Lo que sale de las brasas.
7. Te guardamos una mesa.
8. ¿Patio, barra o cava?
9. Una mesa larga frente a la cava.
10. La barra recibe a otros bares.
11. Humo de copal en la entrada. (confirmar que lo encienden)
12. Brasas, cempasúchil y noche.
13. Pide el patio al reservar.
14. Oaxaca cabe en una mesa.

**Palabras que sí:** brasa, leña, humo, resina, encender, lámpara tejida, cempasúchil, patio, barra, cava, mesa larga, costa, valle, monte, sierra, noche, fuego, copa.

**Palabras a evitar:** «experiencia gastronómica», «única», «auténtico», «tradición milenaria», «sabores ancestrales», «la magia de Oaxaca», «viaje culinario», «fusión», «bienvenidos», «calidad y sabor», «el mejor», «descubre», «explora», «ver más», «con historia», «rincón», «joya escondida».

---

## 6. Quick wins (menos de 30 min cada uno)

1. Quitar el color naranja de «a la sierra» (Concepto.astro:72).
2. Eliminar `.patio-contorno` y su clave `inicio.patio.palabra`.
3. Cambiar `brightness(0.8)` a 0.95 en `.enciende` o quitar el filtro (global.css:277).
4. Quitar el giro de la miniatura en el índice (Adelantos.astro:107-111).
5. Hacer clicable toda la fila del índice (CSS de arriba).
6. Subir los enlaces del footer a 44 px de alto.
7. Cambiar el `<title>` del inicio y la meta description.
8. Agregar og:image con la foto del hero vía `getImage()` y `<meta name="twitter:card" content="summary_large_image">`.
9. Favicon: hoja en #f0802a sobre #120e0b, más un apple-touch-icon en PNG de 180 px.
10. Quitar `.farol-respira` y desactivar `.grano` bajo 64rem.
11. Pegar los textos nuevos de la tabla que no dependen de datos: es.json 29, 31, 32, 34, 38, 18, 19 y en.json 16.
12. Quitar `.hero-detalle`.

---

## 7. Preguntas abiertas para el cliente

1. ~~Las páginas internas: ¿construirlas o quitar enlaces?~~ → **Construirlas.**
2. Datos del restaurante: horario, dirección, teléfono, WhatsApp, Instagram y rango de precio (para JSON-LD y Contacto).
3. El copal: ¿encienden copal de verdad en la entrada? Si es así, es el detalle más propio de la marca y debería contarse. Si no, no se promete.
4. Platillo estrella: ¿cuál es, y qué cocina la parrilla de leña?
5. ~~Bar: ¿qué define la coctelería?~~ → Coctelería de autor con ingredientes oaxaqueños (chintextle, mezcal); ver docs/menu-copal.md. Falta confirmar si hay colaboraciones con otros bares que se puedan nombrar.
6. Wine bar: ¿se sirve vino por copa? ¿Cada cuánto es el Club Social del Vino?
7. Rol de Erick Gaytán (está PENDIENTE en especialistas.yaml).
8. Público principal: ¿turistas, locales o ambos?
9. Prensa, premios o reseñas que se puedan citar textualmente.
10. Tipografía: ¿mantener las 4 familias pero limitar Ultra y Big Shoulders a los nombres de área, y la itálica al Wine bar más una cita?
