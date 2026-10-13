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
- Selector de idioma en el Navbar: un botón-pill con el código del idioma
  **al que lleva** («EN» en la versión española); el `aria-label` anuncia el
  destino. `<html lang>` y `hreflang` automáticos vía `src/layouts/BaseLayout.astro`.
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
│   └── images.ts   # assets → WebP para og:image y para las tarjetas
├── layouts/        # BaseLayout.astro (head, SEO, navbar, footer, ClientRouter)
├── pages/          # rutas ES en raíz + espejo en en/ + 404.astro
└── styles/         # global.css, motion.css + components/ + pages/

.github/workflows/  # deploy.yml → Hostinger por SFTP
public/             # favicon, fuentes (subsets), imágenes, robots.txt, .htaccess
```

---

## Escribir un post

Guía completa (tabla de contenidos, relacionados, anterior/siguiente,
imágenes y la versión en inglés): [`docs/escribir-contenido.md`](docs/escribir-contenido.md).

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
| `translationKey` | no | Empareja la versión ES y la EN para el `hreflang`. Mismo valor en los dos archivos; si falta, se usa el nombre del archivo |

Reglas bilingües:

1. **`translationKey` igual** en ambos idiomas; los slugs pueden diferir
   (`es/primer-post.md` ↔ `en/first-post.md`, ambos con
   `translationKey: "primer-post"`). Sin `translationKey` el emparejamiento cae
   al nombre del archivo.
2. **`lang`** debe coincidir con la carpeta; las páginas filtran por este campo.
3. Los tags son por idioma: `/blog/tags/<tag>` y `/en/blog/tags/<tag>` solo listan posts de su idioma.
4. Paginación: 5 posts por página (`/blog/page/[n]`, `/en/blog/page/[n]`).
5. Cada feed publica solo su idioma (`/rss.xml` ES, `/en/rss.xml` EN).

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
| `repo` | no | El esquema lo acepta, pero la ficha **no pinta** el botón. Vacío si es privado |
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

Está publicado y verificado en `https://adalgarcia.com` (ES) y
`https://adalgarcia.com/en/` (EN), servido desde la raíz de
`domains/adalgarcia.com/public_html/`.

### Requisitos en el hosting

1. Una clave SSH de deploy cuya **pública** esté en `~/.ssh/authorized_keys` del
   usuario de hosting. **Debe ser RSA en PEM** (`-----BEGIN RSA PRIVATE KEY-----`),
   ver "Formato de la clave" más abajo.
2. El dominio debe existir en hPanel → Dominios. Hostinger crea
   `domains/<dominio>/public_html/`; sin eso no hay vhost y el dominio responde 403.
3. La carpeta destino debe **existir**: se sube con `sftp_only: true`, que no crea
   directorios.

### Formato de la clave

`ssh-keygen` genera las claves ed25519 en el formato OpenSSH moderno
(`-----BEGIN OPENSSH PRIVATE KEY-----`). SSH las acepta, pero la imagen de
`wlixcc/SFTP-Deploy-Action` las procesa con libcrypto y falla con:

```
Load key "../private_key.pem": error in libcrypto
Permission denied (publickey,password).
```

Hay que usar **RSA en PEM**:

```bash
ssh-keygen -t rsa -b 4096 -m PEM -C "github-actions-deploy@portafolio-astro" -N "" -f deploy_hostinger_rsa
```

`cat deploy_hostinger_rsa.pub | ssh -p 65002 u320789160@89.116.192.41 'cat >> ~/.ssh/authorized_keys'`

Ojo: `ssh-keygen -p -m PEM` no sirve para *convertir* una ed25519 existente, y
`-m PEM` rechaza ed25519 al generar (OpenSSH 10.5). Hay que generar RSA en PEM
directamente.

### Secretos del repositorio

| Secreto | Obligatorio | Contenido |
|---|---|---|
| `SFTP_HOST` | sí | IP del hosting (`89.116.192.41`) |
| `SFTP_PORT` | no | Puerto SSH (aquí `65002`, no el 22) |
| `SFTP_USERNAME` | sí | Usuario SSH (`u320789160`) |
| `SFTP_SSH_KEY` | sí | Clave privada RSA en PEM, **con el salto de línea final** |
| `SFTP_TARGET_DIR` | sí | `/home/u320789160/domains/adalgarcia.com/public_html/` |

Ninguno se imprime en los logs: el workflow comprueba que existan antes de subir.

### Dónde vive el sitio

El sitio se sirve desde la **raíz de `adalgarcia.com/public_html/`**, sin
subcarpeta. Conviene no confundir con los otros sitios del mismo hosting:

| Ruta | Qué sirve |
|---|---|
| `domains/adalgarcia.com/public_html/` | **Este proyecto** |
| `domains/astro.adalgarcia.com/public_html/adalgarciaweb/` | Astro v5 anterior (respaldo) |
| `domains/ssr.adalgarcia.com/public_html/` | Angular SSR |
| `domains/olive-wildcat-182436.hostingersite.com/public_html/` | WordPress |

Los `*.hostingersite.com` son placeholders de Hostinger, **no** son destinos de
deploy: sirven un `default.php` de "sitio en construcción".

> Ojo con el `.htaccess` de `astro.adalgarcia.com/public_html/`: reescribe todo
> hacia `/adalgarciaweb/`. Si se despliega en la raíz de ese dominio en vez de en
> la subcarpeta, el sitio queda inalcanzable. En `adalgarcia.com` no aplica.

### DNS y SSL

Cloudflare proxied + sin certificado emitido = **525**. El orden que funciona:

1. hPanel → Dominios → añadir el dominio (crea la carpeta).
2. hPanel → Seguridad → SSL → activar para ese dominio.
3. Cloudflare: registro **A** del apex a `89.116.192.41`, **CNAME** de `www` a
   `adalgarcia.com`, con el proxy en **gris** hasta tener el SSL.
4. Verificar con `curl -I https://el-dominio/`.

### Publicar contenido

1. Editar el Markdown en `src/content/{blog,projects}/{es,en}/`.
2. `pnpm build` en local para verificar.
3. Commit + push a `main`; el workflow construye y sube. Sin subida manual.

### Desplegar a mano

```bash
gh workflow run deploy.yml --ref main
```

Un workflow nuevo **no se ejecuta hasta llegar a la rama por defecto**: hasta
que el primer merge no lleve `deploy.yml` a `main`, `gh workflow run` responde
`workflow deploy.yml not found on the default branch`. Se dispara solo con el
push de ese merge.

> ⚠️ El workflow no borra archivos remotos (`delete_remote_files: false`): nunca
> elimina lo que no sube. Un borrado se hace a mano y con backup. El
> `default.php` de Hostinger queda debajo de `index.html` y es inofensivo.

### Publicar contenido

1. Editar el Markdown en `src/content/{blog,projects}/{es,en}/`.
2. `pnpm build` en local para verificar.
3. Commit + push a `main`; el workflow construye y sube. Sin subida manual.

### 404 en el hosting

`public/.htaccess` define `ErrorDocument 404 /404.html`, compresión y caché de
estáticos; `public/en/.htaccess` sirve `/en/404/index.html` para rutas
desconocidas bajo `/en/`. El workflow sube el `.htaccess` de la raíz en un paso
aparte porque el glob de `sftp` omite los dotfiles de primer nivel.
