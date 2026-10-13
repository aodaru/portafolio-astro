# Review — Cierre de pendientes post-lanzamiento (fechas, glass, contraste, i18n)

**Fecha:** 2026-10-13
**Veredicto:** CORREGIDO (`check` 0 errores, build 54 páginas, 0 violaciones de
contraste en 18 rutas × 2 temas, verificado en navegador)

Spec: `specs/2026-10-12-post-lanzamiento-pendientes/`. Cierra casi todo lo que
quedó abierto tras el lanzamiento; quedan fuera el Lighthouse sobre la URL
pública (necesita el deploy) y las 301 del WordPress (necesitan el inventario
de URLs, que solo tiene el dueño).

## 1. Fechas: se formatean en UTC

`date: 2026-01-01` en el frontmatter es medianoche UTC, así que
`toLocaleDateString` sin zona lo renderizaba como **31 de diciembre** en
cualquier locale al oeste de UTC. `formatDate()` fija `timeZone: 'UTC'`.

Verificado con `TZ=America/Bogota`: post, listado y RSS coinciden (1 de enero de
2026 / `Thu, 01 Jan 2026 00:00:00 GMT`) en ES y EN.

## 2. Glass del navbar: el prefijo lo pone el minificador

Dos causas, no una:

- **El build recortaba las parejas de prefijos.** Vite minifica el CSS con
  Lightning CSS y toma los targets de `vite.build.cssTarget`, que no estaba
  configurado. Sin targets, Lightning CSS no sabe qué navegadores siguen
  necesitando el prefijo y colapsa `backdrop-filter` + `-webkit-backdrop-filter`
  a una sola declaración, y como en el fuente el `-webkit-` iba después, dejaba
  **solo** el prefijo (efecto invisible en Chrome/Firefox). Fix: `cssTarget:
  ['chrome111', 'firefox128', 'safari16.4']` en `astro.config.ts` y **no escribir
  el prefijo a mano** en el CSS (9 archivos).
- **El navbar tenía `background-color: transparent`**, así que el blur no se
  percibía sobre el fondo plano. Se añade el token `--gruvbox-navbar-bg`
  (`rgba(235,219,178,0.5)` en claro, `rgba(60,56,54,0.5)` en oscuro), la réplica
  del `rgba(var(--bs-secondary-bg-rgb), 0.5)` del WordPress.

Verificado en `dist/`: `backdrop-filter` y `-webkit-backdrop-filter` en las 4
medidas (8/10/12/20 px), y capturas con contenido desplazado bajo el navbar en
ambos temas.

## 3. Contraste: tokens `*-ink` en todo el sitio

Los acentos GruvBox no llegan a 4.5:1 como texto en tema claro. Se extiende el
patrón de `--gruvbox-yellow-ink` con `gray-ink`, `blue-ink`, `green-ink`,
`orange-ink` y `red-ink` (claro/oscuro), y se sustituyen **127 usos de `color:`
como texto** en blog, tags, trabajos, contacto, home, error y los componentes
compartidos. Los colores base, los bordes y los fondos no cambian.

- En oscuro solo se corrigen los que no llegaban (gray 2.95 → 4.97, blue
  4.02 → 4.86); el resto queda igual: sin regresión.
- La medición con axe destapó casos que el cálculo sobre el fondo del `body` no
  veía: chips `.post-tag` (4.46 → 4.80+ sobre el fondo del terminal), CTA
  "Visitar proyecto" en `/trabajos/[slug]` (crema sobre amarillo, **2.18:1** →
  5.78:1, ahora `--gruvbox-yellow-ink` de fondo), `.post-toc-heading` y
  `.post-nav-title` (4.3 → 4.83), el párrafo del tag con `opacity-75` sobre un
  span de color (3.55 → 5.82) y el `.err-output-code` de la 404 (3.76/3.99).
- `opacity-60` → `opacity-80` en los párrafos introductorios (3.9:1 → 7.1:1).

## 4. Contenido en inglés

- Traducidos `docker`, `omarchy` y `terminal` a `src/content/blog/en/`.
- **`translationKey` en los 4 pares ES/EN** (incluido `primer-post` ↔
  `first-post`). `postAlternates()` emparejaba por **slug** y recibía solo los
  posts del idioma actual: nunca encontraba la otra versión y el `x-default` de
  `first-post` apuntaba a `/blog/first-post`, que no existe. Ahora empareja por
  `translationKey` (con el slug de respaldo) y recibe las dos listas.
- **Feeds por idioma**: `/en/rss.xml` publicaba los 8 posts (los 4 en español
  incluidos) con la descripción en español. Ahora filtra por `lang`, y título y
  descripción van en inglés.
- Texto en español que quedaba en páginas EN: la intro de `/en/blog` y la de
  `/en/trabajos` (claves `blog.intro` y `works.intro` nuevas), `ls -la proyectos/`
  y `~/proyectos/` del terminal.

## 5. Redirecciones 301 y limpieza

- **Bloqueadas**: no hay copia de las URLs indexadas del WordPress en el repo
  (`themeWp/` es la plantilla del tema, no el sitio). No se inventan reglas. En
  `public/.htaccess` queda el bloque comentado con el formato y las advertencias;
  el pendiente se anota en `specs/tech-stack.md`.
- Borradas las 7 ramas locales mergeadas y sus 5 equivalentes en `origin`
  (incluida `docs/fase-9-deploy-real`).
- Documentada la limpieza de hosting que no se hace desde el repo: `default.php`
  bajo `index.html` y la ed25519 antigua en `authorized_keys`.

## Verificación

- `pnpm check` → 0 errors, 0 warnings · `pnpm build` → 54 páginas
- axe-core 4.10 (`color-contrast`) en 18 rutas × 2 temas (con las 404 de ambos
  idiomas): 0 violaciones; pills del navbar 5.78:1 (claro) / 8.69:1 (oscuro)
- Lighthouse del navegador (snapshot, ambos temas): A11y/BP/SEO 100 en `/`,
  `/en/`, `/blog`, `/trabajos`, `/contacto` y sus pares y detalles
- `/en/blog` lista 4 posts; `hreflang` correcto en los 4 pares; sitemap con las
  rutas nuevas; `/en/rss.xml` con 4 items

---

# Review — Navbar: el selector de idioma pasa a un solo botón

**Fecha:** 2026-10-12
**Veredicto:** CORREGIDO (`check` 0 errores, verificado en navegador)

## Contexto

El selector de idioma era un par de enlaces (`ES` | `EN`) con el idioma actual
resaltado. Ocupaba dos elementos y empujaba al resto de la barra; en móvil
sumaba una fila más al panel desplegado.

## Cambio

- **`src/components/Navbar.astro`**: los dos enlaces se sustituyen por un único
  `<a>`-pill (`.lang-switch`) que muestra el código del idioma **al que lleva**,
  no el actual (en español se ve `EN`). El idioma vigente se sobreentiende por
  contexto. El `aria-label` anuncia el destino («Cambiar idioma a English»): un
  enlace cuyo nombre accesible es solo «EN» no le dice a un lector de pantalla
  qué hace, y el nombre visible va `aria-hidden` para no duplicarse.
- **`src/i18n/ui.ts`**: nueva clave `nav.lang.to` (ES/EN) como prefijo del
  `aria-label`.
- **`src/styles/components/navbar.css`**: pill con el mismo lenguaje visual que
  `.theme-toggle` (fondo amarillo, glifo en monoespaciada).
  - Estados `:link`, `:visited`, `:hover`, `:focus` y `:active` fijan `color`
    de forma explícita. Sin eso el navegador aplicaba el color de enlace
    visitado sobre el fondo amarillo y el botón «se perdía» al hacer click
    continuo.
  - `transition-property` acotada a `background-color` y `transform`: con `all`
    el color se animaba también durante la navegación, lo que lo hacía parpadear.
  - `:active` con tono más oscuro y `scale(0.96)` para que el clic se vea al
    soltar el ratón.
  - `:focus-visible` usa `--gruvbox-bg` como `outline`: con `--gruvbox-fg`
    quedaba casi invisible sobre el amarillo.
- Se retiran `.lang-switcher`, `.lang-active` y `.lang-inactive`.

## Verificación

- `pnpm check` → 0 errors, 0 warnings
- A 390 px y en desktop: el pill se lee y es pulsable; el anillo de foco se ve
  al tabular.

---

# Review — Fix: el icono de sol salía sin los rayos horizontales

**Fecha:** 2026-10-12
**Veredicto:** CORREGIDO (`check` 0 errores, verificado en navegador)

## Contexto

El toggle de tema usaba un sol con solo los cuatro rayos diagonales: le
faltaban los horizontales y el rayo sur estaba mal escrito.

## Causa raíz

El `path` del `<symbol id="sun">` en `src/layouts/BaseLayout.astro` llegó
truncado al pegarlo. Faltaban los segmentos de los rayos este y oeste, y el del
sur quedó como `…0 0 1 0-1v-2A.5.5 0 0 1 0 13`, una secuencia de coordenadas
que el navegador descarta en silencio (sin error en consola).

## Cambio

- **`src/layouts/BaseLayout.astro`**: `path` de `#sun` restituido. Es el mismo
  glifo que el `#moon` de al lado, de Bootstrap Icons; ahora sí, el sol está
  completo.

## Verificación

- `pnpm check` → 0 errors, 0 warnings
- El sol se ve con los ocho rayos en ambos temas.

---

# Review — Fix: menú móvil invisible al terminar el dropdown

**Fecha:** 2026-10-12
**Veredicto:** CORREGIDO (`check` 0 errores, verificado en navegador a 390 px)

## Contexto

Reportado en móvil: el dropdown del menú abría con la animación de altura, pero
al terminar el área del menú quedaba vacía — los enlaces desaparecían.

## Causa raíz

El script de `Navbar.astro` replicaba el patrón Bootstrap collapse y, al acabar
`transitionend`, añadía la clase `collapse` al panel. Esa clase colisiona con la
utilidad de Tailwind 4:

```css
.collapse { visibility: collapse; }
```

`.nav-collapse` es un flex item de `.nav-container`. En un flex item,
`visibility: collapse` equivale a `hidden` pero conserva su hueco: el panel
medía 228 px y los enlaces quedaban invisibles. Además del caso reportado, se
disparaba al cruzar a desktop con el menú abierto (el handler de resize añadía
`collapse`, y el media query de desktop no anulaba `visibility`).

## Cambio

Se abandona el vocabulario de Bootstrap (`collapse` / `collapsing` / `show`),
que ahora colisiona con Tailwind, por clases que no existen en el framework:
`is-animating` (transición de altura) e `is-open` (abierto). En reposo el panel
usa `display: none`.

- **`src/styles/components/navbar.css`**: estados `.is-animating` / `.is-open`
  con `visibility: visible` explícito; el bloque desktop mantiene
  `display: flex !important`; `.nav-collapse` se suma a `prefers-reduced-motion`.
- **`src/components/Navbar.astro`**: helpers `finishOpen` / `finishClose`; el
  cierre fija la altura en px y commitea la transición (reflow) antes de bajarla
  a 0; `transitionend` ignora eventos de elementos hijos; con
  `prefers-reduced-motion` se aplica el estado final sin esperar el evento (si
  solo se anula la transición en CSS, `transitionend` no dispara y el panel se
  quedaría a media altura).

## Verificación

- `pnpm check` → 0 errors, 0 warnings
- Navegador a 390 px: al terminar la animación el panel queda en `is-open`
  (228 px) con Blog, Trabajos, Contacto y Repo visibles; al cerrar queda en
  `display: none` y el hueco desaparece.
- Redimensionar a desktop con el menú abierto: la barra horizontal sigue visible.

---

# Review — Contacto: quitar el correo, dejar solo redes sociales

**Fecha:** 2026-10-12
**Veredicto:** CORREGIDO (`check` 0 errores, verificado en navegador)

## Contexto

Se pidió retirar el correo como canal de contacto y dejar únicamente los enlaces
a redes sociales.

## Cambio

- **`src/pages/contacto.astro`** y **`src/pages/en/contacto.astro`**: eliminado
  el bloque `.contact-email` (mailto `hola@teapartydev.com`) y sus estilos.
- **`src/pages/index.astro`** y **`src/pages/en/index.astro`**: eliminado
  `const email` y el botón `mailto:` de la card de contacto.
- **`src/styles/pages/home.css`**: borrado `.wp-social-btn--email`, que quedaba
  huérfano.
- **`src/i18n/ui.ts`**: `contact.text` ES/EN ya no menciona "correo
  electrónico" / "email".

## Verificación

- `grep` en `src/`: sin referencias a `mailto`, `hola@teapartydev`,
  `contact-email` ni `const email`.
- `pnpm check` → 0 errors, 0 warnings
- Navegador: `/contacto`, `/en/contacto`, `/` y `/en/` dan 0 enlaces `mailto` y
  4 redes cada uno. El JSON-LD `Person` de la home ya listaba solo las 4 redes
  en `sameAs`.

---

# Review — Fase 9: Polish & Deploy

**Fecha:** 2026-10-12
**Veredicto:** IMPLEMENTADA (build 41 páginas, `check` 0 errores, Lighthouse local 100 desk / 97 mob)

## Contexto

Última fase del MVP: cerrar detalles (404 bilingüe, View Transitions,
animaciones, responsive) y dejar el deploy automático al Hostinger existente por
SFTP. En el camino aparecieron dos regresiones serias de fases anteriores y el
pendiente de Lighthouse de la Fase 7.

## Decisiones y cambios

- **`site` → `https://adalgarcia.com`.** Se corrigieron también `robots.txt`
  (que apuntaba al dominio viejo) y el `Person.url` del JSON-LD de la home.
- **404 bilingüe** con `noindex` (nuevo prop de `BaseLayout`) y hreflang propio
  `/404.html` ↔ `/en/404/`. Se excluyó la 404 del sitemap con
  `sitemap({ filter })`.
- **View Transitions** con `ClientRouter`. Astro reemplaza los atributos de
  `<html>` en cada navegación (`swapRootAttributes` en `swap-functions.js`), así
  que el script inline del tema necesita `data-astro-rerun`, y los listeners
  (tema, reveals, video diferido, menú mobile) se enlazan en `astro:page-load`
  con guardas `data-astro-init` para no duplicar en la primera carga.
- **Animaciones unificadas** en `src/styles/motion.css`: `.stagger-in` (con
  `--reveal-delay`) reemplaza los `nth-child` duplicados de `blog.css` y las
  animaciones inline de las páginas de tags (que ignoraban
  `prefers-reduced-motion`). Se añade foco visible consistente por teclado.
- **Deploy**: `.github/workflows/deploy.yml` con
  `wlixcc/SFTP-Deploy-Action@v1.2.6` (SFTP con clave SSH, `sftp_only: true`),
  destino por secreto `SFTP_TARGET_DIR` o input `target_dir`, preflight de
  secretos y `delete_remote_files: false` para no tocar el WordPress vivo.
- **`.htaccess`** (raíz y `/en/`) para la 404 por idioma, compresión y caché de
  estáticos; el de la raíz se sube en un paso aparte porque el glob de `sftp`
  omite los dotfiles.

## Bugs encontrados y corregidos

| Bug | Detalle |
|---|---|
| Video del hero nunca cargaba | La Fase 8 reescribió `index.astro` y perdió el script que inyectaba el `<source>` de `data-taza-defer`: el hero era una caja vacía. Ahora el defer vive en `BaseLayout` y respeta `prefers-reduced-motion` |
| Imágenes 404 en blog | Tarjetas del listado, hero del post y "relacionados" usaban `post.data.image` (ruta pública) mientras los jpg/png viven en `src/assets/` → 6 requests 404 por página. Se resolvió con `resolveImageUrl()` en `utils/images.ts` |
| Textos ES en páginas EN | `PostNav` ("← Anterior"/"Siguiente →") y el `aria-label` del TOC estaban hardcodeados; ahora salen de `ui.ts` |
| Accesibilidad (tema claro) | Contraste < 4.5:1 en `.wp-role`, `.wp-card-subtitle`, encabezados de card y brand del navbar; nombres accesibles que no contenían el texto visible (brand e idioma). Corregido con `--gruvbox-yellow-ink` y ajustes por tema |
| Lighthouse mobile 59 | Las fuentes pesaban 1,98 MB (build Nerd Font con +10 000 codepoints). Subset con `pyftsubset` → 186 KB; `poster` del hero y preload del LCP. Mobile 59 → 97, desktop 88 → 100 |

## Verificación

- `pnpm check` → 0 errors, 0 warnings
- `pnpm build` → 41 páginas, `dist/404.html` + `dist/en/404/index.html`,
  sitemap sin 404, canonical/robots/RSS en `adalgarcia.com`
- Navegador: 21 combinaciones (7 rutas × 375/768/1280 px) sin overflow
  horizontal; tab order lógico con foco visible; View Transitions persisten el
  tema y reejecutan reveals y video; 404 ES/EN en ambos temas
- Lighthouse (local, `pnpm preview`): Perf 100 desk / 97 mob, A11y/BP/SEO 100 en
  `/` y `/en/`, sin auditorías binarias fallidas

## Pendiente del dueño

~~Cargar los secretos y correr el workflow~~ → **hecho 2026-10-13**, ver
"Primer deploy a producción" más abajo.

~~Backup del WordPress y cambiar el DNS a `adalgarcia.com`~~ → **hecho**: el
dominio existe en hPanel, SSL emitido y DNS en Cloudflare apuntando a
`89.116.192.41`.

# Deploy — Primer deploy a producción

**Fecha:** 2026-10-13
**Veredicto:** PUBLICADO en `https://adalgarcia.com` (verificado ES/EN, 404, sitemap)

## Contexto

PR #4 mergeado en `main`, lo que disparó el primer deploy. La documentación
(README, AGENTS.md, tech-stack) describía un destino y un dominio que no
existían en el hosting, así que buena parte del trabajo fue descubrir el
estado real antes de poder publicar.

## Lo que había que verificar primero

- **El dominio no existía.** `adalgarcia.com` no estaba en `domains/` del
  hosting: el vhost respondía 403 y el `public_html` del home era un symlink
  roto. Un dominio ausente en hPanel → Dominios no se arregla desde Cloudflare.
- **Había tres sitios más en el mismo plan** (`astro.adalgarcia.com` con el
  Astro v5 anterior, `ssr.adalgarcia.com` con Angular, y un WordPress en
  `olive-wildcat-*.hostingersite.com`). Los `*.hostingersite.com` son
  placeholders de Hostinger, no destinos de deploy.
- **El `.htaccess` de `astro.adalgarcia.com/public_html/` reescribe todo hacia
  `/adalgarciaweb/`**, así que desplegar en la raíz de ese dominio deja el
  sitio inalcanzable. Este proyecto va en la raíz de `adalgarcia.com`, donde
  ese rewrite no aplica.

## Bugs encontrados y corregidos

| Bug | Detalle |
|---|---|
| Deploy fallaba con `error in libcrypto` | La clave ed25519 de `ssh-keygen` está en formato OpenSSH moderno (`BEGIN OPENSSH PRIVATE KEY`), que SSH acepta pero `wlixcc/SFTP-Deploy-Action` no procesa. Resuelto con una clave **RSA 4096 en PEM**; la pública se añadió a `~/.ssh/authorized_keys` |
| `gh workflow run` no encontraba el workflow | `deploy.yml` solo vivía en la rama feature. GitHub exige que el workflow esté en la rama por defecto para despacharlo: el primer merge a `main` es lo que lo habilita |
| `adalgarcia.com` daba 525 | Cloudflare proxied sin certificado emitido. Proxy en gris hasta activar el SSL en hPanel |

## Detalles que costaron tiempo

- `ssh-keygen -p -m PEM` **no** convierte una ed25519 existente, y `-m PEM`
  rechaza ed25519 al generar en OpenSSH 10.5: hay que generar RSA en PEM
  directamente. La prueba local con `ssh`/`sftp` da OK con ed25519, así que
  **el fallo solo se ve en el runner**.
- 403 y 525 son fallos distintos con causas distintas: 403 = el dominio no está
  en hPanel; 525 = el proxy de Cloudflare no negotiate TLS con el origen.
- `sftp_only: true` no crea carpetas: el destino debe existir antes del deploy.

## Verificación

- Secretos: `SFTP_HOST=89.116.192.41`, `SFTP_PORT=65002`,
  `SFTP_USERNAME=u320789160`, `SFTP_TARGET_DIR` a la raíz de
  `domains/adalgarcia.com/public_html/`
- Deploy `#38329666049` en verde: 99 archivos, ambos `.htaccess` en su sitio
- Producción: `/`, `/blog/`, `/trabajos/`, `/contacto/`, `/en/`, `/en/blog/` y
  `/en/trabajos/` → 200; ruta inexistente → 404 con el diseño del sitio
  (`<title>404 — Teapartydev</title>`), o sea que el `ErrorDocument` funciona en
  ambos idiomas; `sitemap-index.xml` y `favicon.svg` → 200
- Los 403 en `/_astro/` y `/fonts/` son correctos: `Options -Indexes` bloqueando
  el listado de directorios

## Pendiente

- Lighthouse sobre la URL pública (el de la spec es local, con `pnpm preview`)
- Redirecciones 301 de las URLs indexadas del WordPress
- `default.php` de Hostinger queda bajo `index.html`: inofensivo, borrable a mano
- `authorized_keys` tiene la ed25519 original además de la RSA en uso; la
  ed25519 se puede quitar

# Review — Reconciliación de ramas divergentes (Fase 6 + Fase 8)

**Fecha:** 2026-10-12
**Veredicto:** APROBADO (build 38 páginas, check 0 errores, verificado en navegador)

## Contexto

El roadmap de la rama de trabajo marcaba la Fase 6 como pendiente, pero ya estaba
cerrada: vivía en `feat/internacionalizacion`, divergente desde `main` (eb0ba5e)
de `feat/fase-8-rediseno-home`. Dos líneas con trabajo exclusivo cada una:

| Rama | Entregables |
|---|---|
| `feat/internacionalizacion` (base) | Fase 6 bilingüe + Fase 7 SEO/performance |
| `feat/fase-8-rediseno-home` | navbar fiel al WP, rediseño del post, home WP-style, favicon |

Base: la rama i18n (más fases cerradas y ya pusheada). 17 archivos en conflicto.

## Decisiones

- **Helpers sin duplicar.** `src/i18n/utils.ts` (cadenas de UI) y
  `src/i18n/content.ts` (colecciones) se conservan con responsabilidades
  separadas; `content.ts` re-exporta `Lang`, `formatDate` y `getLangFromUrl`
  desde `utils.ts`. Se descarta el `utils.ts` de la Fase 8, que traducía inline
  y chocaba de firma (`AstroGlobal` vs `URL`) — ese choque rompió el build en
  `blog/tags/index.astro`.
- **Navbar**: markup WP-fidelity de la Fase 8 + selector ES|EN y
  `translatePath()`, que el markup WP había perdido.
- **Home**: markup `wp-layout` (coincide con el `home.css` que trajo el merge)
  cableado a `useTranslations`; claves `home.intro` y `home.card.*` añadidas a
  `ui.ts`. Se pasa `lang={lang}` a `BaseLayout`.
- **Post individual**: diseño rico de la Fase 8 + `useTranslations`, y filtro por
  idioma en `getStaticPaths` — sin él `/blog/<slug>` colisionaba entre ES y EN.
- **Trabajos/contacto/tags**: tarjetas de la Fase 8 con i18n; URLs vía
  `getSlugFromId` porque los proyectos viven ahora en `projects/{es,en}/`.
- **BaseLayout**: API de la i18n + favicons completos, `fullTitle` y prop
  `alternates` para hreflang condicional. **No** se recupera el CDN de
  nerdfonts: los símbolos ya son un subset local.
- **Páginas `/en/`**: regeneradas desde su par en la raíz (mismo archivo,
  imports un nivel más profundos, filtro de colección en `'en'`).

## Bugs encontrados y corregidos

| Bug | Detalle |
|---|---|
| Firma de `getLangFromUrl` | El archivo de la Fase 8 llamaba `getLangFromUrl(Astro)`; el helper maduro recibe `URL`. Rompía el build de `/blog/tags` |
| Colisión de rutas ES/EN | `getStaticPaths` sin filtro de idioma: `es/omarchy` y `en/omarchy` → mismo `/blog/omarchy` |
| Objeto inline renderizado | Resto del objeto `t` de la Fase 8 colgando entre el frontmatter y `<BaseLayout>`; se imprimía como texto en la home. Detectado en snapshot de accesibilidad |
| Home EN desalineada | `src/pages/en/index.astro` mantenía el diseño `inicio8`, cuya CSS ya no existe tras el merge |

## Archivos

17 en conflicto + 10 regeneraciones de `/en/`. decisión por decisión en el
mensaje del commit de merge (`b1fade4`).

## Verificación

- `pnpm build` → 38 páginas HTML, 0 errores
- `pnpm astro check` → 0 errors, 0 warnings (24 hints preexistentes de `z`)
- Navegador: home ES/EN con el mismo diseño `wp-layout` y traducidas; navbar
  fijo con brand WP y selector ES|EN (ES→`/`, EN→`/en/`); toggle mobile con
  animación Bootstrap (`collapsing`, 232px, 6 enlaces); post con hero, lede,
  metadata, TOC de 3-4 ítems, relacionados y Shiki GruvBox dual-theme; trabajos
  con 3 cards en ES y EN; contacto con 4 cards + email
- Sin overflow horizontal a 375px en `/`, `/blog`, `/blog/omarchy`,
  `/trabajos`, `/contacto`, `/en/`
- Toggle de tema oscuro/claro con persistencia

## observaciones pendientes (no tocadas)

- `Avatar.webp` se precarga en todas las páginas vía `BaseLayout` pero solo se
  usa en la home → warning de preload no usado en el resto (preexistente, Fase 7)
- Las fechas se renderizan en zona horaria local, así que un `date: 2026-01-01`
  (medianoche UTC) se muestra como 31 de diciembre en UTC-5 (preexistente)
- El roadmap documenta la Fase 8 con la dirección "terminal refinado"
  (`inicio8`), pero la iteración final fue la fidelidad WP (`wp-layout`); queda
  anotado en `specs/roadmap.md` con una nota de reconciliación

# Review — Rediseño del post individual, SEO base y favicon

**Fecha:** 2026-10-12
**Veredicto:** APROVED (build + check limpios, verificado en navegador)

## Contexto

El usuario reportó que los posts no le convencían: "les falta algo". Al revisar
`/blog/es/omarchy` en el navegador, el diagnóstico fue que el post era un muro de
texto monoespaciado: sin imagen de portada (aunque el frontmatter la declaraba),
sin tiempo de lectura, sin lede, y dead-end al final sin navegación.

De paso aparecieron cuatro bugs y un desajuste documental.

## Bugs corregidos

| Bug | Antes | Después |
|---|---|---|
| Link roto | `/blog/tags` → **404** (el botón "Ver todos los tags" no llevaba a nada) | `/blog/tags` generado, 13 tags con conteo |
| Slug con locale | `/blog/es/omarchy` | `/blog/omarchy` (prefijo de idioma fuera de la URL) |
| RSS | Apuntaba a `/blog/es/omarchy/` (ruta vieja) | Usa el helper `blogPath()` |
| Favicon | Logo de Astro (placeholder de scaffolding) | SVG de la taza + PNG 192/512 + apple-touch |

## Post individual

- **Header dentro de la terminal card** — antes fecha/H1/tags vivían fuera de la
  caja y la caja arrancaba después; se leía como dos bloques pegados.
- **Hero image** desde el frontmatter (`image`), con `loading="eager"`.
- **Metadata**: fecha · tiempo de lectura (200 wpm) · palabras · autor.
- **Lede**: la `description` del frontmatter, que no se renderizaba en el post.
- **Navegación anterior/siguiente** — cierra el dead-end.
- **Relacionados** por tags compartidos (fallback a los más recientes), en
  `src/components/PostNav.astro`.
- **TOC** automática cuando hay ≥3 `h2`, vía `headings` de `render()`.
- **Syntax highlighting** con Shiki, temas GruvBox claro/oscuro conmutados por
  `data-theme` (`astro.config.ts` → `markdown.shikiConfig`).

## SEO

`BaseLayout.astro` ahora emite lo que el roadmap declaraba pero no existía:

- `canonical` absoluto (prop `path`)
- Open Graph completo + Twitter Card
- `<html lang>` dinámico
- `hreflang` **condicional**: solo los idiomas con contenido real. Con un único
  idioma queda `es` + `x-default`; al agregar `src/content/blog/en/` los pares
  aparecen solos

## Desajuste documental encontrado

El roadmap marcaba la Fase 6 y parte de la 7 como completadas, pero el código no
tenía: ni `hreflang`, ni OG, ni `<html lang>` dinámico, ni `src/pages/en/`, ni
`src/content/blog/en/`. Los ítems se corrigieron a su estado real y la Fase 6
queda **pendiente** en su entregable (falta el contenido en inglés).

## Fuera de alcance (dejado como estaba)

El video de la taza volvió a `taza-cafe-compressed.webm`. Se había cambiado a
`taza-cafe-smooth.webm` (88 KB vs 246 KB) y no fue la decisión correcta: el
criterio de peso de archivo no era el relevante.

## Archivos

| Archivo | Cambio |
|---|---|
| `src/i18n/content.ts` | Nuevo — helpers de contenido, rutas por idioma, `postAlternates` |
| `src/components/PostNav.astro` | Nuevo — anterior/siguiente + relacionados |
| `src/pages/blog/[...slug].astro` | Reescrito |
| `src/pages/blog/tags/index.astro` | Nuevo — índice de tags (arregla el 404) |
| `src/pages/blog/tags/[tag].astro` | Rutas limpias + i18n |
| `src/components/BlogPostList.astro` | Rutas limpias + i18n |
| `src/layouts/BaseLayout.astro` | SEO, `lang` dinámico, favicons |
| `src/content.config.ts` | `author`, `updated` en blog; `repo` en projects |
| `src/pages/rss.xml.ts` | Rutas limpias |
| `astro.config.ts` | `shikiConfig` |
| `public/favicon.svg` | Logo de Astro → taza |
| `README.md` | Nuevo — guía de posts y proyectos |
| `AGENTS.md` | Estado real del repo |

## Verificación

- `pnpm build` → ✅ 26 páginas, 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings
- Navegador: canonical, hreflang, OG, hero, TOC, relacionados y navegación
  verificados por DOM sobre `/blog/omarchy`
- `/blog/tags` → 13 tags, 4 artículos

---

# Review — Animación de colapso del navbar (Bootstrap collapse)

**Fecha:** 2026-09-29
**Veredicto:** APPROVED

## Resumen

El usuario reportó que el menú mobile se abría "de golpe" — faltaba la animación de altura. Inspeccioné el WP con chrome-devtools y confirmé que usa el patrón Bootstrap collapse (`height 0.35s` + clases `collapse`/`collapsing`/`show`). Implementé ese patrón en el JS y CSS del Navbar.

## Implementación

### CSS — clases Bootstrap collapse
```css
.nav-collapse {
  display: block;
  flex-basis: 100%;
  order: 3;
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}

.nav-collapse.collapse:not(.show) { display: none; }
.nav-collapse.collapsing {
  display: block;
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
.nav-collapse.collapse.show {
  display: block;
  height: auto;
  overflow: visible;
}
```

### JS — toggle con animación de altura
- Al abrir: `height: 0px` → forzar reflow → `height: ${scrollHeight}px`
- Al cerrar: `height: ${scrollHeight}px` → forzar reflow → `height: 0px`
- Listener `transitionend` para limpiar estilos y aplicar `show` o quitarlo

## Comparación métrica con WP

| Métrica | WP | Astro | ✓ |
|---------|-----|-------|---|
| `transition` en collapse | `height 0.35s` | `height 0.35s` | ✅ |
| `overflow` durante transición | `hidden` | `hidden` | ✅ |
| Clase durante animación | `collapsing` | `collapsing` | ✅ |
| Clase al finalizar abrir | `collapse show` | `collapse show` | ✅ |
| Altura final abierto | `auto` (calculada) | `auto` | ✅ |
| Altura inicial cerrado | `0` | `0` | ✅ |

## Verificación visual

A los 150ms (mitad de los 350ms), la altura del collapse era 161px (entre 0 y 246px), confirmando la animación interpolada.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/components/Navbar.astro` | JS reescrito: Bootstrap collapse con animación de altura |
| `src/styles/components/navbar.css` | Clases `.collapse`/`.collapsing`/`.show` + transition `height 0.35s` |

## Verificación

- `pnpm build` → ✅ 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings
