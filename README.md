# Portafolio — adalgarcia.com

Portafolio personal bilingüe (ES/EN) construido con **Astro 7** (SSG estático),
Tailwind CSS 4 y estética terminal GruvBox. Se publica en Hostinger por SFTP
desde GitHub Actions.

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
- 404 bilingüe: `src/pages/404.astro` (ES → `dist/404.html`) y
  `src/pages/en/404.astro` (EN → `dist/en/404/`); ambas con `noindex`.

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

`resolveImageUrl()` (`src/utils/images.ts`) es el helper para un `<img>` simple
(tarjetas del listado, miniaturas de "relacionados"): resuelve los estáticos de
`src/assets/` a WebP optimizado y deja los GIF en su ruta pública. Usar
`post.data.image` directo da 404 para los jpg/png.

---

## Fuentes y peso

Las fuentes de `public/fonts/` son **subsets** generados con `pyftsubset` desde
los TTF de `themeWp/fonts/` (Mononoki y MesloLG vienen parcheados con +10 000
codepoints de Nerd Fonts y pesaban ~2 MB en total; el subset baja a ~186 KB).

Para regenerarlas:

```bash
pyftsubset themeWp/fonts/Mononoki-Regular.ttf \
  --output-file=public/fonts/Mononoki-Regular.woff2 \
  --flavor=woff2 --layout-features='*' --name-IDs='*' --drop-tables+=DSIG \
  --unicodes="U+0000-00FF,U+0100-017F,U+2000-206F,U+20A0-20BF,U+2190-21FF,U+2500-257F,U+2580-259F,U+25A0-25FF,U+2600-26FF,U+2700-27BF" \
  --text-file=<archivo con los caracteres usados en src/>
```

Los glifos de Nerd Fonts que usa el Navbar viven aparte, en
`nerd-symbols-subset.woff2` (2 glifos). Si añades un glifo exótico (fuera de esos
rangos) verifica que se vea y amplía los rangos si hace falta.

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

El sitemap excluye las páginas 404 (`astro.config.ts` → `sitemap.filter`) y el
prop `noindex` añade `<meta name="robots" content="noindex, follow">` cuando se
necesita.

---

## Navegación y animaciones

- `BaseLayout.astro` monta `<ClientRouter />` (View Transitions de Astro): la
  navegación entre páginas es client-side y no recarga el documento.
- Astro **reemplaza los atributos de `<html>`** en cada navegación, así que el
  script de tema usa `data-astro-rerun` y todo lo demás (tema, reveals, video
  diferido de la taza, menú mobile) se enlaza en `astro:page-load`. Si añades un
  script con listeners al DOM, hazlo igual: con `ClientRouter` los scripts ya
  ejecutados no vuelven a correr.
- Utilidades de animación compartidas en `src/styles/motion.css`
  (`.stagger-in` con `--reveal-delay`, `.reveal` para reveals al hacer scroll).
  Todas se desactivan con `prefers-reduced-motion: reduce`.

---

## Deploy (Hostinger por SFTP)

El sitio es estático: el workflow `.github/workflows/deploy.yml` construye con
`pnpm` y sube el contenido de `dist/` al hosting por SFTP. Se dispara **solo** con
push a `main` o a mano (`workflow_dispatch`, con un input `target_dir` para
probar otra carpeta sin tocar secretos).

### Requisitos en el hosting

1. Una clave SSH de deploy (ed25519) cuya **pública** esté en
   `~/.ssh/authorized_keys` del usuario de hosting.
2. La carpeta destino debe **existir**: se sube con `sftp_only: true`, que no crea
   directorios. Ej.: `public_html/astro-staging/`.

### Secretos del repositorio

| Secreto | Obligatorio | Contenido |
|---|---|---|
| `SFTP_HOST` | sí | Host o IP del hosting |
| `SFTP_USERNAME` | sí | Usuario SSH |
| `SFTP_SSH_KEY` | sí | Clave privada completa, **con el salto de línea final** |
| `SFTP_TARGET_DIR` | sí | Ruta remota destino (staging primero) |
| `SFTP_PORT` | no | Puerto SSH (por defecto 22) |

Ninguno se imprime en los logs: el workflow comprueba que existan antes de subir.

### Pasar de staging a producción

1. Deploy manual a una subcarpeta (`workflow_dispatch` con `target_dir`) y
   verificar que el sitio carga y que las rutas inexistentes devuelven la 404.
2. Cambiar el secreto `SFTP_TARGET_DIR` a `public_html/` **después de hacer
   backup del WordPress actual** y confirmar el cambio de DNS.

> ⚠️ El workflow no borra archivos remotos (`delete_remote_files: false`): nunca
> elimina lo que no sube. Un borrado se hace a mano y con backup.

### Publicar contenido

1. Editar el Markdown en `src/content/{blog,projects}/{es,en}/`.
2. `pnpm build` en local para verificar.
3. Commit + push a `main`; el workflow construye y sube. Sin subida manual.

### 404 en el hosting

`public/.htaccess` define `ErrorDocument 404 /404.html`, compresión y caché de
estáticos; `public/en/.htaccess` sirve `/en/404/index.html` para rutas
desconocidas bajo `/en/`. El workflow sube el `.htaccess` de la raíz en un paso
aparte porque el glob de `sftp` omite los dotfiles de primer nivel.
