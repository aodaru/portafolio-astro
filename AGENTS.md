# AGENTS.md

## Stack
- **Framework:** Astro 7 (SSG estático)
- **Package manager:** pnpm — **NO usar npm** (ni `npm install`, ni `npm run`, ni `npx`)
- **package.json:** **No usar `^` (caret)** en versiones de dependencias — pin exactas
- **Modo:** ES modules (`"type": "module"`)
- **Idioma:** Español (con i18n ES/EN planificado)

## Estado actual
- Astro 7 + Tailwind 4 configurados; `src/` completo
- Fases 1–8 del roadmap completas; Fase 9 (polish + deploy) pendiente
- **La variante en inglés no existe todavía**: no hay `src/pages/en/` ni
  `src/content/blog/en/`. El código ya soporta ambos (helpers en
  `src/i18n/content.ts`, hreflang condicional), pero falta el contenido.
- Sin linter ni formatter. Typecheck vía `astro check`

## Comandos
- `pnpm dev` — servidor de desarrollo
- `pnpm build` — build a `dist/`
- `pnpm preview` — sirve el build
- `pnpm check` — typecheck
- `pnpm sync` — regenerar tipos

## Documentación
- `README.md` — estructura y **guía para escribir posts y proyectos**
  (qué campos va en el frontmatter, qué es opcional)
- `specs/roadmap.md` — fases y entregables
- `specs/<fecha>-<fase>/` — requirements, plan y validation por fase
- `changelog.md` — bitácora de revisiones con veredicto

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
