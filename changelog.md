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
