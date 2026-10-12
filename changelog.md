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
