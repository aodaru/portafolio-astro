# Portafolio — teapartydev.com

Portafolio personal bilingüe (ES/EN) construido con **Astro 7** (SSG estático),
Tailwind CSS 4 y estética terminal GruvBox.

> Documentación de proceso (roadmap, specs por fase): [`specs/`](specs/)
> Reglas para agentes: [`AGENTS.md`](AGENTS.md)

---

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Build estático a `dist/` |
| `pnpm preview` | Sirve `dist/` para verificar el build |
| `pnpm check` | Typecheck (`astro check`) |
| `pnpm sync` | Regenera los tipos de `astro:content` |

Usar **pnpm**. El proyecto es ESM (`"type": "module"`).

---

## Rutas por idioma

- Español (default, sin prefijo): `/`, `/blog`, `/trabajos`, `/contacto`
- Inglés (prefijo `/en`): `/en/`, `/en/blog`, `/en/trabajos`, `/en/contacto`
- Selector ES | EN en el Navbar; `<html lang>` y `hreflang` automáticos vía `src/layouts/BaseLayout.astro`.

---

## Estructura

```
src/
├── components/     # Navbar, Footer, TazaAscii, PostNav, BlogPostList, ContentImage
├── content/
│   ├── blog/       # es/<slug>.md + en/<slug>.md  (carpeta = idioma)
│   └── projects/   # es/<slug>.md + en/<slug>.md
├── i18n/
│   ├── content.ts  # helpers de contenido (rutas, fechas, hreflang, reading time)
│   ├── ui.ts       # diccionarios es/en de textos de UI
│   └── bio-*.json  # bio por idioma
├── utils/
│   └── images.ts   # assets → WebP para og:image
├── layouts/        # BaseLayout.astro (head, SEO, navbar, footer)
├── pages/          # rutas ES en raíz + espejo en en/
└── styles/         # global.css + components/ + pages/
```

---

## Escribir un post

Crear `src/content/blog/es/<slug>.md`. **La carpeta es el idioma**: `es/` o `en/`.
La URL se deriva del slug, sin la carpeta: `es/docker.md` → `/blog/docker`
(en inglés: `en/docker.md` → `/en/blog/docker`).

```markdown
---
title: "Título del post"
description: "Se muestra como lede bajo el título y como meta description."
date: 2025-12-24
tags: ["Docker", "Linux"]
image: "/img/posts/docker.jpg"
draft: false
lang: es
translationKey: "mi-post"
---

## Sección

Contenido...
```

| Campo | Obligatorio | Notas |
|---|---|---|
| `title` | sí | |
| `description` | sí | Se usa de lede y de `meta description` |
| `date` | sí | |
| `tags` | no | Lista; cada tag genera `/blog/tags/<tag>` |
| `image` | no | Si falta, el listado usa un emoji según el título |
| `draft` | no | `true` lo excluye del build, del RSS y del sitemap |
| `updated` | no | Si está, se muestra "Última actualización" al pie |
| `author` | no | Por defecto `Adal Michael García` |
| `lang` | sí | `es` \| `en`; **debe coincidir con el subdirectorio** |
| `translationKey` | no | Mismo valor en ambas versiones para relacionarlas |

Reglas bilingües:

1. **Mismo slug** en ambos idiomas: `es/mi-post.md` ↔ `en/mi-post.md`.
2. **`lang`** debe coincidir con la carpeta; las páginas filtran por este campo.
3. Los tags son por idioma: `/blog/tags/<tag>` y `/en/blog/tags/<tag>` solo listan posts de su idioma.
4. Paginación: 5 posts por página (`/blog/page/[n]`, `/en/blog/page/[n]`).

Code fences se resaltan con Shiki (temas GruvBox claro/oscuro, vía `data-theme`).

---

## Escribir un proyecto

Crear `src/content/projects/es/<slug>.md` (y su par en `en/`).

```markdown
---
title: "Nombre del proyecto"
description: "Resumen de una línea."
date: 2024-10-15
tags: ["PHP", "MySQL"]
image: "/img/Works/Intranet1_1.png"
url: "https://ejemplo.com"
repo: "https://github.com/usuario/repo"
draft: false
lang: es
---

Descripción larga del proyecto...
```

| Campo | Obligatorio | Notas |
|---|---|---|
| `title` | sí | |
| `description` | sí | |
| `date` | sí | |
| `tags` | sí | Lista de stacks |
| `image` | no | |
| `url` | no | Botón **"Visitar proyecto"**. Vacío si es privado |
| `repo` | no | Botón **"Ver código"**. Vacío si es privado |
| `draft` | no | |
| `lang` | sí | `es` \| `en`; **debe coincidir con el subdirectorio** |

`url` y `repo` son opcionales e **independientes**: un proyecto puede tener solo
uno, los dos o ninguno. Si el repositorio es privado, **dejar el campo vacío o
omitirlo** — no enlazar a un repo inaccesible.

---

## Imágenes de contenido y feeds RSS

- El campo `image` del frontmatter usa la ruta pública histórica (`/img/posts/...`, `/img/Works/...`).
- Los estáticos (jpg/png) viven en `src/assets/` y se sirven optimizados (WebP, anchos responsivos) vía `src/utils/images.ts` + `src/components/ContentImage.astro`.
- Los GIF animados se quedan en `public/img/` para conservar la animación.
- La imagen por defecto para OG/Twitter es `/img/Avatar.webp`; el detalle de blog/trabajo usa su `image` (con `article:published_time`).
- Feeds RSS por idioma: `/rss.xml` (solo `lang: es`) y `/en/rss.xml` (solo `lang: en`), con autodiscovery en el `<head>` según idioma.

---

## Traducciones de UI

- `src/i18n/ui.ts` — diccionarios `es` / `en` (claves como `nav.home`, `blog.back`, `works.visit`).
- `src/i18n/bio-es.json`, `src/i18n/bio-en.json` — datos del hero/home por idioma.
- Helpers en `src/i18n/utils.ts`: `getLangFromUrl`, `useTranslations`, `useTranslatedPath`, `formatDate`, `getAlternateUrls`.
- Helpers de contenido en `src/i18n/content.ts`: `blogPath`, `getLangFromId`, `getSlugFromId`, `formatReadingTime`, `countWords`, `postAlternates`.
- En páginas nuevas: obtener `lang`, crear `t`, pasar `lang={lang}` a `BaseLayout`, usar `translatePath()` para enlaces internos y `t()` para todo texto visible.

---

## SEO

`BaseLayout.astro` genera automáticamente:

- `canonical` absoluto (usa el prop `path`, si no, la ruta actual)
- `hreflang` por idioma — **solo para idiomas que existen de verdad**. Si una
  página pasa el prop `alternates` (ver `postAlternates`), se respetan esos
  pares; si no, se emiten `es` / `en` / `x-default`.
- Open Graph y Twitter Card (`og:title`, `og:description`, `og:image`, ...)
- `<meta name="author">`
- `og:image` en WebP optimizado cuando la ruta existe en `src/assets/`
- Autodiscovery del RSS del idioma actual

Para pasar `path`, `image` o `alternates`, ver los props en `layouts/BaseLayout.astro`.
