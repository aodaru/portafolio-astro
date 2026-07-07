# AGENTS.md

## Stack
- **Framework:** Astro 7 (SSG estático)
- **Package manager:** pnpm — **NO usar npm** (ni `npm install`, ni `npm run`, ni `npx`)
- **package.json:** **No usar `^` (caret)** en versiones de dependencias — pin exactas
- **Modo:** ES modules (`"type": "module"`)
- **Idioma:** Español (con i18n ES/EN planificado)

## Estado actual (pre-scaffolding)
- No existe `src/` — hay que crearlo
- No existe `astro.config.ts` — hay que crearlo
- `package.json` solo tiene placeholder `"test"` — no hay scripts dev/build
- No hay TypeScript configurado (`tsconfig.json` ausente)
- No hay linter, formatter ni typecheck

## Comandos (pendientes de definir en package.json)
Una vez configurado Astro:
- `pnpm astro dev` — servidor de desarrollo
- `pnpm astro build` — build a `dist/`
- `pnpm astro check` — typecheck Astro
- `pnpm astro sync` — regenerar tipos

## Assets a migrar
- `themeWp/` contiene el tema WordPress original (GruvBox, Bootstrap, SCSS)
- Imágenes, CSS/SCSS, JS, fuentes en subdirectorios de `themeWp/`

## Hoja de ruta
Ver `specs/roadmap.md` para las 9 fases de implementación.
Fase 1 (scaffolding) está ~10% — solo `pnpm install` ejecutado.

## Skills instalados (`.agents/skills/`)
- `astro/` — guía de CLI, estructura, content collections
- `seo/` — meta tags, sitemap, RSS, OG
- `frontend-design/` — diseño UI
- `accessibility/` — WCAG, patrones accesibles
- `nodejs-best-practices/` — principios generales
- `nodejs-backend-patterns/` — patrones backend (no aplica a este proyecto SSG)
