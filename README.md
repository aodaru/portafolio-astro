# Portafolio — teapartydev.com

Portafolio personal bilingüe (ES/EN) construido con **Astro 7** (SSG estático), Tailwind CSS 4 y estética terminal GruvBox.

- `pnpm dev` — servidor de desarrollo (`http://localhost:4321`)
- `pnpm build` — build estático a `dist/`
- `pnpm preview` — previsualizar el build
- `pnpm astro check` — typecheck (debe pasar con 0 errores)
- `pnpm astro sync` — regenerar tipos

> Package manager: **pnpm**. No usar npm.

## Rutas por idioma

- Español (default, sin prefijo): `/`, `/blog`, `/trabajos`, `/contacto`
- Inglés (prefijo `/en`): `/en/`, `/en/blog`, `/en/trabajos`, `/en/contacto`
- Selector ES | EN en el Navbar; `<html lang>` y `hreflang` automáticos vía `src/layouts/BaseLayout.astro`.

## Cómo crear posts bilingües

Estructura:

```
src/content/blog/es/mi-post.md   # lang: es
src/content/blog/en/mi-post.md   # lang: en (mismo slug)
```

Frontmatter requerido:

```md
---
title: "Título del post"
description: "Resumen corto para listados y meta tags."
date: 2026-09-28
tags: ["Astro", "Linux"]
image: "/img/posts/mi-post.jpg"   # opcional
draft: false
lang: es                            # es | en (debe coincidir con el directorio)
translationKey: "mi-post"           # opcional, mismo valor en ambas versiones
---
```

Reglas:

1. **Mismo slug** en ambos idiomas para relacionar versiones (`es/mi-post.md` ↔ `en/mi-post.md`).
2. **`lang`** debe coincidir con el subdirectorio; las páginas filtran por este campo.
3. Los tags son por idioma: las páginas `/blog/tags/[tag]` y `/en/blog/tags/[tag]` solo listan posts de su idioma.
4. Paginación: 5 posts por página (`/blog/page/[n]`, `/en/blog/page/[n]`).
5. `draft: true` excluye el post del build.

## Cómo crear proyectos bilingües

```
src/content/projects/es/mi-proyecto.md
src/content/projects/en/mi-proyecto.md
```

Mismo frontmatter que los posts, más `url` opcional (enlace externo "Visitar proyecto") y `lang: es | en`.

## Imágenes de contenido e feeds RSS

- El campo `image` del frontmatter usa la ruta pública histórica (`/img/posts/...`, `/img/Works/...`).
- Los estáticos (jpg/png) viven en `src/assets/` y se sirven optimizados (WebP, anchos responsivos) vía `src/utils/images.ts` + `src/components/ContentImage.astro`.
- Los GIF animados se quedan en `public/img/` para conservar la animación.
- La imagen por defecto para OG/Twitter es `/img/Avatar.webp`; el detalle de blog/trabajo usa su `image` (con `article:published_time`).
- Feeds RSS por idioma: `/rss.xml` (solo `lang: es`) y `/en/rss.xml` (solo `lang: en`), con autodiscovery en el `<head>` según idioma.

## Traducciones de UI

- `src/i18n/ui.ts` — diccionarios `es` / `en` (claves como `nav.home`, `blog.back`, `works.visit`).
- `src/i18n/bio-es.json`, `src/i18n/bio-en.json` — datos del hero/home por idioma.
- Helpers en `src/i18n/utils.ts`: `getLangFromUrl`, `useTranslations`, `useTranslatedPath`, `formatDate`, `getAlternateUrls`.
- En páginas nuevas: obtener `lang`, crear `t`, pasar `lang={lang}` a `BaseLayout`, usar `translatePath()` para enlaces internos y `t()` para todo texto visible.
