# AGENTS.md

## Stack
- **Framework:** Astro 7 (SSG estático) + Tailwind CSS 4 (vía `@tailwindcss/vite`)
- **Package manager:** pnpm — **NO usar npm** (ni `npm install`, ni `npm run`, ni `npx`)
- **package.json:** **No usar `^` (caret)** en versiones de dependencias — pin exactas
- **Modo:** ES modules (`"type": "module"`)
- **Idioma:** Español como idioma base; i18n ES/EN completo

## Estado actual
- Fases 1–9 del roadmap implementadas y **mergeadas en `main`**. El sitio está
  publicado y verificado en `https://adalgarcia.com`. La spec de la Fase 9 está
  en `specs/2026-10-12-fase-9-polish-deploy/`.
- **Sitio bilingüe funcionando**: español en la raíz (`/`, `/blog`, `/trabajos`,
  `/contacto`) e inglés bajo `/en/...`. Contenido real en ambos idiomas en
  `src/content/blog/{es,en}/` y `src/content/projects/{es,en}/`.
- El cableado i18n vive en `src/i18n/`: `ui.ts` (diccionarios), `utils.ts`
  (UI: `getLangFromUrl`, `useTranslations`, `useTranslatedPath`, `formatDate`,
  `getAlternateUrls`) y `content.ts` (contenido: `blogPath`, `getLangFromId`,
  `getSlugFromId`, `postAlternates`, `countWords`, `formatReadingTime`).
- Las páginas `/en/` son espejo de las de la raíz: mismo archivo con imports un
  nivel más profundos y el filtro de colección en `'en'`.
- 404 bilingüe: `src/pages/404.astro` (ES) y `src/pages/en/404.astro` (EN → `/en/404/`).
- Sin linter ni formatter. Typecheck vía `astro check`

## Convenciones que muerden si se ignoran

- **View Transitions**: `BaseLayout.astro` monta `<ClientRouter />`. Astro
  **reemplaza los atributos de `<html>`** en cada navegación y **no reejecuta los
  scripts ya corridos**. Por eso: el script inline del tema lleva
  `data-astro-rerun`, y cualquier listener nuevo se enlaza en `astro:page-load`
  con guarda (`data-astro-init`) para no duplicar en la primera carga.
- **Imágenes de contenido**: en un `<img>` simple usar `resolveImageUrl()`
  (`src/utils/images.ts`). El frontmatter guarda rutas públicas históricas
  (`/img/posts/...`) pero los jpg/png viven en `src/assets/` → usar
  `post.data.image` directo da 404.
- **Fuentes**: `public/fonts/*.woff2` son subsets hechos con `pyftsubset` desde
  `themeWp/fonts/*.ttf` (los TTF vienen con +10 000 codepoints de Nerd Fonts y
  pesan ~2 MB). Receta de regeneración en el README, sección "Fuentes y peso".
- **Animaciones**: usar las utilidades de `src/styles/motion.css`
  (`.stagger-in` con `--reveal-delay`, `.reveal`) y respetar
  `prefers-reduced-motion` — el criterio es bloqueante, no opcional.
- **Colores de texto**: los acentos de la paleta GruvBox no siempre llegan a
  4.5:1 (sobre todo en tema claro); para texto existe `--gruvbox-yellow-ink`.
- **Clases del navbar móvil**: los estados son `is-animating` / `is-open`, nunca
  `collapse` / `collapsing` / `show`. Tailwind 4 ya define `.collapse` como
  `visibility: collapse`, que en un flex item deja el hueco pero oculta el
  contenido: el menú abría y se veía vacío. Con `prefers-reduced-motion` hay que
  aplicar el estado final en JS, no solo anular la transición en CSS — si no,
  `transitionend` no dispara y el panel se queda a media altura.
- **Deploy**: `.htaccess` de la raíz y de `/en/` (se copian desde `public/`); el
  workflow los sube aparte porque el glob de `sftp` omite los dotfiles. El de la
  raíz define `ErrorDocument 404 /404.html`: si se borra, las 404 pasan a ser las
  genéricas del hosting.
- **Rewrite de `astro.adalgarcia.com`**: su `.htaccess` de `public_html/`
  reescribe todo hacia `/adalgarciaweb/`. Desplegar en la raíz de ese dominio
  deja el sitio inalcanzable. Este proyecto va en `adalgarcia.com/public_html/`,
  donde ese rewrite no aplica.

## Comandos
- `pnpm dev` — servidor de desarrollo
- `pnpm build` — build a `dist/`
- `pnpm preview` — sirve el build
- `pnpm check` — typecheck
- `pnpm sync` — regenerar tipos

## Documentación
- `README.md` — estructura, guía corta para escribir posts y proyectos, deploy y fuentes
- `docs/escribir-contenido.md` — manual de contenido: TOC, relacionados, imágenes, bilingüe
- `specs/roadmap.md` — fases y entregables
- `specs/<fecha>-<fase>/` — requirements, plan y validation por fase
- `changelog.md` — bitácora de revisiones con veredicto
- `specs/tech-stack.md` — stack real (versiones pineadas, deploy, i18n)

## Deploy
- Hosting: **Hostinger**, por SFTP desde `.github/workflows/deploy.yml`
  (solo `main` o `workflow_dispatch`). Publicado en `https://adalgarcia.com`
  (ES) y `/en/` (EN).
- Destino real: `/home/user/domains/adalgarcia.com/public_html/` — la
  **raíz**, sin subcarpeta ni rewrite. Hosting en `127.0.0.1:<SFTP_PORT>`,
  usuario `user`.
- Secretos requeridos: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_SSH_KEY`,
  `SFTP_TARGET_DIR` (opcional `SFTP_PORT`). Nunca versionar credenciales.
- **La clave SSH debe ser RSA en PEM** (`BEGIN RSA PRIVATE KEY`), no ed25519:
  el action usa libcrypto y con el formato OpenSSH moderno falla con
  `error in libcrypto`. `ssh-keygen -t rsa -b 4096 -m PEM -N "" -f <archivo>`.
  Receta completa en el README, sección "Formato de la clave".
- Otros sitios del mismo hosting que **no** son este proyecto:
  `astro.adalgarcia.com/.../adalgarciaweb/` (Astro v5, respaldo),
  `ssr.adalgarcia.com/` (Angular), `olive-wildcat-*.hostingersite.com`
  (WordPress). Los `*.hostingersite.com` son placeholders de Hostinger, no
  destinos de deploy.
- El dominio debe existir en hPanel → Dominios antes de que el DNS signifique
  algo: sin carpeta en `domains/` el vhost responde 403. Y Cloudflare proxied
  sin SSL da **525**: proxy en gris hasta que el certificado esté emitido.
- `delete_remote_files: false`: el workflow **no borra nada** del hosting.
- `gh workflow run deploy.yml` falla con `workflow not found on the default
  branch` mientras `deploy.yml` no haya llegado a `main`.

## Assets de referencia
- `themeWp/` contiene el tema WordPress original (GruvBox, Bootstrap, SCSS), ya
  migrado: se conserva como fuente de fuentes y material gráfico.
- Imágenes, CSS/SCSS, JS y fuentes originales en subdirectorios de `themeWp/`.

## Hoja de ruta
Ver `specs/roadmap.md`. Fase 10 (post-lanzamiento) está sin empezar: comentarios,
buscador, `/now`, analytics y modo print para CV.

## Skills instalados (`.agents/skills/`)
- `astro/` — guía de CLI, estructura, content collections
- `seo/` — meta tags, sitemap, RSS, OG
- `frontend-design/` — diseño UI
- `accessibility/` — WCAG, patrones accesibles
- `nodejs-best-practices/` — principios generales
- `nodejs-backend-patterns/` — patrones backend (no aplica a este proyecto SSG)
