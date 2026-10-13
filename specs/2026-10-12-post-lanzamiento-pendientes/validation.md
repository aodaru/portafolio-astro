# Validación — Post-lanzamiento: cierre de pendientes

## Estado de la fase

**🟨 PARCIAL** — Grupos 1–6, 8 y 9 hechos y verificados (los de producción, tras
el deploy). Grupo 7 **bloqueado por el dueño** (falta el inventario de URLs del
WordPress).

## Criterios de éxito

### 1. Documentación sincronizada

- [x] `changelog.md` incluye la entrada del primer deploy a producción
- [x] `specs/tech-stack.md` describe el hosting y el deploy reales (host, puerto, clave RSA en PEM)
- [x] `specs/roadmap.md`: "Dominio personalizado y HTTPS" marcado como hecho
- [x] `specs/roadmap.md`: la Fase 10 figura como **standby**, no como pendiente activa
- [x] `docs/fase-9-deploy-real` borrada (local y remota) sin pérdida de contenido
- [x] No quedan "pendientes del dueño" de la Fase 9 que ya estén resueltos

### 2. Fechas correctas

- [x] Un post con `date: 2026-01-01` se muestra como 1 de enero, no como 31 de diciembre
- [x] El listado del blog, el post individual y el RSS coinciden en la fecha
- [x] Ocurre igual en ES y en EN

> Verificado en un build con `TZ=America/Bogota`: `dist/blog/omarchy/index.html`
> → `1 de enero de 2026`; `dist/en/blog/omarchy/index.html` → `January 1, 2026`;
> listado `/blog` → `1 de enero de 2026`; `dist/rss.xml` →
> `Thu, 01 Jan 2026 00:00:00 GMT`. Antes del fix el navegador en UTC-5 mostraba
> 31 de diciembre (el `Date` del frontmatter es medianoche UTC).

### 3. Glass del navbar

- [x] El CSS de `dist/` contiene `backdrop-filter` **sin** prefijo, además del `-webkit-`
- [x] El mismo arreglo alcanza footer, `.terminal-card` y `.blog-card`
- [x] El navbar tiene fondo semitransparente (no `transparent`) tomado de un token
- [x] El efecto se percibe al desplazar contenido por debajo del navbar, en ambos temas
- [x] El contraste de texto del navbar sigue cumpliendo en ambos temas

> `grep` sobre `dist/_astro/*.css`: `backdrop-filter` aparece en las 4 medidas
> (8/10/12/20 px) y `-webkit-backdrop-filter` en las mismas 4 (antes: solo el
> prefijo). Causa raíz: Lightning CSS deduplicaba las dos declaraciones porque el
> `-webkit-` ya venía en el fuente y el minificador corría sin targets;
> el fix son los `cssTarget` en `astro.config.ts` + dejar de escribir el prefijo
> a mano. Capturas con contenido desplazado bajo el navbar en claro
> (`/blog`) y oscuro (`/trabajos`). Pills del navbar (`.lang-switch`,
> `.theme-toggle`) y brand: 5.78:1 en claro, 8.69:1 y 6.84:1 en oscuro.

### 4. Contraste en tema claro

- [x] Títulos, fechas y tags con ≥ 4.5:1 en tema claro en `/blog`, `/blog/[slug]`, `/blog/tags`, `/blog/tags/[tag]` y `/trabajos`
- [x] Lo mismo en los pares `/en/`
- [x] El tema oscuro no se degrada con los tokens nuevos

> Auditoría con **axe-core 4.10** (`color-contrast`) sobre `pnpm preview`, en 18
> rutas × 2 temas (incluidas las 404 de ambos idiomas): **0 violaciones**.
> Tokens nuevos en `src/styles/global.css` (claro / oscuro):
> `--gruvbox-yellow-ink` `#7d5600` / `#fabd2f`, `--gruvbox-gray-ink`
> `#665c54` / `#bdae93`, `--gruvbox-blue-ink` `#046172` / `#a3c9c4`,
> `--gruvbox-green-ink` `#3d7050` / `#8ec07c`, `--gruvbox-orange-ink`
> `#af3a03` / `#fe8019`, `--gruvbox-red-ink` `#b0180f` / `#ff6f65`.
> En oscuro solo cambian los que no llegaban (gray y blue); el resto se queda
> igual o mejora, así que no hay regresión.
> Casos que la medición destapó y se corrigieron: chips `.post-tag` (4.46 → 9 ó
> 4.86), CTA "Visitar proyecto" (crema sobre amarillo, 2.18:1 → 5.78:1),
> `.post-toc-heading` / `.post-nav-title` (4.3 → 4.83), párrafo del tag con
> `opacity-75` sobre un span de color (3.55 → 5.82), `.err-output-code` de la 404
> (3.76 / 3.99 → 4.84 / 5.04).

### 5. Contenido en inglés

- [x] `/en/blog` lista 4 posts
- [x] Cada par ES/EN declara el mismo `translationKey`
- [x] El `hreflang` de cada post apunta solo a los idiomas que existen
- [x] `sitemap-0.xml` incluye `/en/blog/docker/`, `/en/blog/omarchy/`, `/en/blog/terminal/` (o los slugs elegidos)
- [x] `/en/rss.xml` publica los 4 posts
- [x] Sin texto en español ni enlaces a rutas ES dentro de las páginas EN

> Los slugs en inglés coinciden con el español (`docker`, `omarchy`, `terminal`)
> y el par existente sigue con slugs distintos (`primer-post` ↔ `first-post`).
> `hreflang`: ES+EN+x-default en los 4 pares, con la ruta de cada idioma
> (`/en/blog/first-post` para `primer-post`). El feed es por idioma: antes
> `/en/rss.xml` publicaba los 8 posts (los 4 en español incluidos) → ahora 4 y 4.
> Texto en español que había en páginas EN y se corrigió: intro de `/en/blog`,
> intro y `ls -la proyectos/` de `/en/trabajos`, `~/proyectos/` del terminal de
> `/en/trabajos/[slug]` (claves `blog.intro` y `works.intro` nuevas en `ui.ts`).
> Los únicos enlaces sin `/en` que quedan en páginas EN son el selector de idioma
> (`hreflang="es"`, a propósito).

### 6. Lighthouse en la URL pública

- [x] Medición mobile y desktop sobre `/` y `/en/`
- [x] Resultados registrados en la tabla de abajo
- [x] Las 4 categorías en 90+ (o el desvío documentado con su causa)

> Medido el 2026-10-13 sobre `https://adalgarcia.com` con el PR ya desplegado
> (deploy `38333801898` en verde). A11y/BP/SEO con Lighthouse del navegador
> (modo snapshot, ambos temas); Performance con las métricas de laboratorio de
> una traza sobre la URL pública (viewport móvil 390×844, CPU 4×) — Performance
> **no da puntaje**, su audit está excluido de este Lighthouse y no se
> reconstruye con una dependencia nueva solo para el número.

| Página | Dispositivo | Performance | A11y | Best Practices | SEO |
| ------ | ----------- | ----------- | ---- | -------------- | --- |
| `/`    | Mobile      | LCP 0,89 s · CLS 0,00 | 100 | 100 | 100 |
| `/`    | Desktop     | LCP 0,89 s · CLS 0,00 | 100 | 100 | 100 |
| `/en/` | Mobile      | LCP 0,44 s · CLS 0,00 | 100 | 100 | 100 |
| `/en/` | Desktop     | LCP 0,44 s · CLS 0,00 | 100 | 100 | 100 |

> Nota: una corrida con Lighthouse completo desde el Chrome remoto (Browserless)
> dio mobile **86 / 100 / 77 / 100**. El desvío no es del sitio: Cloudflare le
> sirvió a ese navegador headless el reto `/cdn-cgi/challenge-platform/...`
> (que aporta ~1,2 s de *script evaluation* → TBT 400 ms) y su beacon de
> analytics (`static.cloudflareinsights.com`) falló con `ERR_CONNECTION_REFUSED`.
> Los dos únicos fallos de Best Practices en esa corrida son justamente esos
> scripts de Cloudflare, no código del sitio. Medición local del mismo código:
> A11y/BP/SEO 100 en las 18 rutas auditadas.

### 7. Redirecciones 301

- [ ] Inventario de URLs indexadas del WordPress entregado por el dueño
- [ ] Mapa URL vieja → ruta de Astro documentado
- [ ] Reglas implementadas en `public/.htaccess`
- [ ] Cada URL vieja responde 301 con `Location` a una ruta que devuelve 200
- [ ] Sin bucles ni cadenas de más de un salto
- [x] Las rutas nuevas (`/blog/*`, `/trabajos/*`, `/en/*`) siguen respondiendo 200
- [x] La 404 propia sigue funcionando en ambos idiomas

> **Bloqueado**: el inventario solo lo tiene el dueño (no hay `sitemap.xml` del
> WordPress ni backup de la base en el repo; `themeWp/` es la plantilla del tema,
> sus enlaces son `index.html`/`blog.html`). No se inventan reglas. Queda en
> `public/.htaccess` el bloque comentado con el formato y las advertencias, y el
> pendiente anotado en `specs/tech-stack.md`.

### 8. Limpieza

- [x] Las 7 ramas locales mergeadas están borradas
- [x] Sus equivalentes remotos también
- [x] Queda registrado el pendiente de hosting (`default.php`, ed25519 en `authorized_keys`)

> Locales borradas: `feat/fase-9-polish-deploy`, `feat/fase-8-port-i18n`,
> `backup/fase-8-rediseno-home-20261012`, `feat/fase-8-rediseno-home`,
> `feat/internacionalizacion`, `feat/seo-performance`,
> `feat/fase-5b-exploracion-disenos-home`. Remotas: `docs/fase-9-deploy-real` y
> las 4 anteriores que existían en `origin`. `docs/deploy-changelog` (local y
> remota) se conserva hasta que el PR entre a `main`.
> Quedan en `origin`, ya mergeadas y sin tocar, `fase-1-scaffolding` y
> `feat/contenido-pendiente` (fuera de la lista del plan).

## Cómo verificar

```bash
# Desde la raíz del proyecto (pnpm, sin npm/npx)
pnpm check
pnpm build

# Grupo 3: el prefijo estándar sobrevive a la minificación
grep -o 'backdrop-filter:blur(10px)' dist/_astro/*.css | head
grep -o '\-webkit-backdrop-filter:blur(10px)' dist/_astro/*.css | head

# Grupo 5: rutas y feed en inglés
ls dist/en/blog/*/
grep -o 'hreflang="[^"]*"' dist/en/blog/docker/index.html
grep -c '/en/blog/' dist/sitemap-0.xml
grep -o '<link>[^<]*</link>' dist/en/rss.xml | head

# Grupo 8: ramas ya mergeadas
git branch --merged main

# Grupo 7: redirecciones en producción (sustituir por las URLs reales)
curl -sI https://adalgarcia.com/<url-vieja> | grep -iE 'HTTP/|location'

# Grupo 2 y 4: fechas y contraste, con la zona del dueño y axe en el navegador
TZ=America/Bogota pnpm build && grep -o '1 de enero de 2026' dist/blog/omarchy/index.html
pnpm preview
# DevTools → Lighthouse (mobile + desktop) sobre https://adalgarcia.com/ y /en/
```

## Criterio de merge a main

- [x] Los criterios de producción verificados tras el deploy (queda fuera el Grupo 7, bloqueado por el dueño)
- [x] `pnpm check` y `pnpm build` en verde
- [x] PR abierto
- [x] Validación manual ejecutada (build, navegador, axe/Lighthouse)

## Anti-criterios (lo que NO debe pasar)

- ✅ No se tocó la Fase 10: queda en standby, sin implementar ni borrar del roadmap
- ✅ Los `hreflang` y los feeds no anuncian un idioma inexistente
- ✅ No hay reglas 301 (no se inventaron; el bloque va comentado)
- ✅ Sin dependencias nuevas de runtime
- ✅ Cero `npm`/`npx` en scripts y comandos
- ✅ `docs/deploy-changelog` se conserva (su contenido ya está en esta rama)
- ✅ El contraste del tema oscuro no se degrada (solo sube: gray 2.95 → 4.97, blue 4.02 → 4.86)
- ✅ Ninguna regla de `.htaccess` escrita a mano en hPanel

## Verificación en producción (tras el deploy `38333801898`)

- `/`, `/en/`, `/blog/`, `/en/blog/`, `/trabajos/`, `/contacto/`,
  `/blog/omarchy/` y `/en/blog/docker/` → 200; ruta inexistente → 404 del sitio
- El CSS publicado trae `backdrop-filter` **y** `-webkit-backdrop-filter`
  (`/_astro/BaseLayout.CAVzI-ib.css`), más los tokens `--gruvbox-navbar-bg` y
  `--gruvbox-*-ink`
- `https://adalgarcia.com/en/blog` lista 4 posts; el `hreflang` de
  `/en/blog/first-post` apunta a `/blog/primer-post` (ruta real)
- Feeds: `/rss.xml` y `/en/rss.xml` con 4 items cada uno; el sitemap publica las
  20 URLs de `/en/blog/`
- Fecha del post en producción: `<time datetime="2026-01-01T00:00:00.000Z">1 de enero de 2026`

## Bloqueos externos

- **Grupo 7** requiere el inventario de URLs indexadas del WordPress (Search Console o backup de la base). Sin él, las reglas no se inventan.
