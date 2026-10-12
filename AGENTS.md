# AGENTS.md

## Stack
- **Framework:** Astro 7 (SSG estático) + Tailwind CSS 4 (vía `@tailwindcss/vite`)
- **Package manager:** pnpm — **NO usar npm** (ni `npm install`, ni `npm run`, ni `npx`)
- **package.json:** **No usar `^` (caret)** en versiones de dependencias — pin exactas
- **Modo:** ES modules (`"type": "module"`)
- **Idioma:** Español como idioma base; i18n ES/EN completo

## Estado actual
- Fases 1–9 del roadmap implementadas. La Fase 9 (polish + deploy) está en PR,
  pendiente de merge; su spec tiene el detalle en
  `specs/2026-10-12-fase-9-polish-deploy/`.
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
- **Deploy**: `.htaccess` de la raíz y de `/en/` (se copian desde `public/`); el
  workflow los sube aparte porque el glob de `sftp` omite los dotfiles.

## Comandos
- `pnpm dev` — servidor de desarrollo
- `pnpm build` — build a `dist/`
- `pnpm preview` — sirve el build
- `pnpm check` — typecheck
- `pnpm sync` — regenerar tipos

## Documentación
- `README.md` — estructura, **guía para escribir posts y proyectos**, deploy y fuentes
- `specs/roadmap.md` — fases y entregables
- `specs/<fecha>-<fase>/` — requirements, plan y validation por fase
- `changelog.md` — bitácora de revisiones con veredicto
- `specs/tech-stack.md` — stack real (versiones pineadas, deploy, i18n)

## Deploy
- Hosting: **Hostinger**, por SFTP desde `.github/workflows/deploy.yml`
  (solo `main` o `workflow_dispatch`). Dominio: `adalgarcia.com`.
- Secretos requeridos: `SFTP_HOST`, `SFTP_USERNAME`, `SFTP_SSH_KEY`,
  `SFTP_TARGET_DIR` (opcional `SFTP_PORT`). Nunca versionar credenciales.
- `delete_remote_files: false`: el workflow **no borra nada** del hosting.

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
