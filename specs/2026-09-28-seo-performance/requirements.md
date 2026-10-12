# Requisitos — Fase 7: SEO + Performance

## Alcance

### Incluido

- Meta tags Open Graph + Twitter Card dinámicos y bilingües (ES raíz, EN bajo `/en/`)
- Canonical URLs por página e idioma
- RSS corregido y dividido por idioma (`/rss.xml`, `/en/rss.xml`) + autodiscovery
- Migración de imágenes a `astro:assets` (`src/assets/`, WebP, tamaños responsivos)
- Optimización del hero con video (`poster`, preload) y revisión de NerdFonts por CDN
- Lighthouse 90+ en Performance, Accessibility, SEO y Best Practices (mobile + desktop, `/` y `/en/`)
- Roadmap Fase 7 actualizado

### No incluido

- Google Tag Manager / Partytown (diferido: no hay ID de GTM y añade peso de terceros; reevaluar en Fase 8/9)
- Nuevas dependencias npm salvo `sharp` como dependencia de build de Astro
  (`astro:assets` la exige para transformar a WebP; no es tracker de terceros
  como el GTM de D1 — enmienda F1 aprobada 2026-09-28)
- Cambios visuales o de contenido (solo optimización)
- Página 404, View Transitions, deploy (Fase 8)

## Decisiones

| ID  | Decisión | Racional | Alternativa descartada |
| --- | -------- | -------- | ---------------------- |
| D1  | GTM fuera de esta fase | Sin ID de contenedor; scripts de terceros lastran performance, el objetivo de la fase | GTM vía Partytown ahora — bloqueado por falta de ID |
| D2  | Dos feeds RSS (`/rss.xml` ES, `/en/rss.xml` EN) | Cada audiencia consume su idioma; links rotos actuales (`/blog/es/...`) se corrigen por feed | Un solo feed mixto — mezcla idiomas y arrastra el bug de links |
| D3  | Canonical = URL actual (ES raíz, EN `/en/`) | Coherente con `prefixDefaultLocale: false` decidido en Fase 6 | Canonicals a `/es/...` — no existen esas rutas |
| D4  | Una `og:image` por defecto + `image` del frontmatter en detalle | Listados/home comparten imagen de marca; posts/proyectos usan la suya | Generar OG images dinámicas — sobreingeniería para el MVP |
| D5  | Imágenes usadas a `src/assets/`, favicon/`robots.txt` quedan en `public/` | `astro:assets` solo procesa `src/`; estáticos sin procesar siguen en `public/` | Dejar todo en `public/` — sin optimización |
| D6  | Rama apilada sobre `feat/internacionalizacion` | PR #2 sin mergear; el SEO bilingüe (hreflang, OG locale) depende del i18n | Esperar al merge — bloquea el avance |

## Contexto

### Estado actual (auditoría preliminar 2026-09-28)

- `src/layouts/BaseLayout.astro`: solo `title` + `description`; ya emite `hreflang` y `<html lang>` (Fase 6); carga NerdFonts desde CDN (`nerdfonts.com`, render-blocking, tercero).
- `src/pages/rss.xml.ts`: existe pero mezcla idiomas y genera links rotos (`/blog/${post.id}` incluye el prefijo `es/` o `en/`).
- Sitemap (`@astrojs/sitemap`) y `robots.txt` OK, incluyen ambos idiomas (verificado en Fase 6, 37 páginas).
- Imágenes: sin `<img>`/`<Image>` en `src/`; el campo `image` del frontmatter no se renderiza en listados/detalle; assets en `public/img/` (`posts/`, `Works/`, videos `.webm` del hero, `Avatar.png`/`.webp`).
- `astro.config.ts`: bloque `i18n` en working tree sin commitear (resto de Fase 6, ver Grupo 6 paso 28).
- Deps: `@astrojs/rss 4.0.19`, `@astrojs/sitemap 3.7.3` ya instalados; sin Partytown.

### Rutas afectadas

`src/layouts/BaseLayout.astro`, `src/pages/rss.xml.ts` (+ nuevo `src/pages/en/rss.xml.ts`),
`src/pages/blog/[...slug].astro` y `trabajos/[...slug].astro` (ES + EN),
`src/assets/` (nuevo), `public/img/` (adelgazado), `README.md`, `specs/roadmap.md`.

## Dependencias

- **Fase 6**: Internacionalización (merge pendiente, PR #2) — base de la rama y de los tags por idioma.
- **Fase 5B**: Home con video de fondo — objetivo principal de optimización de performance.
- Referencias: `specs/mission.md` (rendimiento, sitio 100% estático), `specs/tech-stack.md` (SEO & Performance: sitemap, RSS, OG, `astro:assets`, Partytown, Lighthouse 90+).

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| Mover imágenes rompe rutas existentes (`/img/...`) | Auditoría de usos (Grupo 1.5) antes de mover; redirects no necesarios al ser build estático con rutas nuevas |
| `og:image` absoluta inválida en dev (`Astro.site` undefined) | Fallback a ruta relativa, como ya hace `BaseLayout` con hreflang |
| Lighthouse < 90 por el video del hero | `poster` + `preload="metadata"` + `prefers-reduced-motion`; medir antes/después |
| NerdFonts CDN penaliza Best Practices/Performance | Self-host del subset o preload; si no alcanza, documentar y seguir |
| Rama apilada diverge si PR #2 cambia | Rebase sobre `feat/internacionalizacion` antes del PR propio |
