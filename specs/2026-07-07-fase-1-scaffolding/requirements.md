# Requirements — Fase 1: Scaffolding

## Ámbito
Setup completo del proyecto Astro: estructura base, configuración de herramientas, migración de assets estáticos. No incluye componentes de UI, layouts ni páginas funcionales (eso es Fase 2+).

## Contexto
- Proyecto portafolio personal de Adal Michael García
- Migración desde tema WordPress "gbaod" (GruvBox + Bootstrap) en `themeWp/`
- Rediseño completo: no se reutiliza CSS/SCSS del tema original
- Estado actual: solo `pnpm install` ejecutado, no hay `src/`, `astro.config.ts`, `tsconfig.json`

## Decisiones técnicas
| Decisión | Opción elegida |
|---|---|
| CSS Framework | **Tailwind CSS v4** |
| Iconos | **Lucide** (npm package) |
| Fuentes | **Google Fonts** (variable fonts) |
| Package manager | **pnpm** — prohibido npm |
| Versiones | **Sin caret `^`** — todas las dependencias pin exactas |
| Módulos | ES modules (`"type": "module"`) |
| TypeScript | Strict mode, paths alias `@/` |

## Dependencias a instalar
- `@astrojs/tailwind` + `tailwindcss`
- `@tailwindcss/vite` (para Tailwind v4 con Vite)
- `lucide-svelte` o `lucide-react` según integración (o usar `lucide` con HTML directo)

## Assets a migrar desde themeWp/
| Asset | Destino |
|---|---|
| `favicon*.ico`, `apple-touch-icon.png` | `public/` |
| `img/Avatar.*`, `img/*.png`, `img/*.webp` | `public/img/` |
| `robots.txt` | `public/` |
| Fuentes en `fonts/` | `public/fonts/` |
| SVG en `img/` | `public/img/` |

## Lo que NO se migra
- PHP (header.php, footer.php, functions.php, etc.)
- CSS/SCSS del tema (rediseño completo)
- JavaScript específico de WordPress
- node_modules del tema
