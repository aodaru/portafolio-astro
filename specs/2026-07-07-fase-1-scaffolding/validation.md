# Validation — Fase 1: Scaffolding

## Criterios de aceptación

> Todos deben pasar para considerar la fase completa y proceder al merge a `main`.

| # | Criterio | Cómo verificarlo |
|---|---|---|
| 1 | `pnpm dev` arranca sin errores | Ejecutar `pnpm astro dev` y ver servidor en localhost |
| 2 | `pnpm build` genera `dist/` | Ejecutar `pnpm astro build`, verificar que `dist/` existe |
| 3 | `pnpm astro check` pasa sin errores | Typecheck de Astro limpio |
| 4 | No hay caréts en `package.json` | `grep '\^' package.json` debe devolver vacío |
| 5 | Estructura de directorios completa | `src/components/`, `src/layouts/`, `src/content/`, `src/pages/`, `src/styles/` existen |
| 6 | Content collections válidas | `pnpm astro sync` ejecutado sin errores |
| 7 | Assets migrados | `public/img/Avatar.webp`, `public/robots.txt`, `public/favicon.ico` existen |
| 8 | Tailwind CSS funcional | `src/styles/global.css` tiene `@import "tailwindcss"`, home page usa clases Tailwind y se renderizan correctamente |
| 9 | Git branch correcta | `git branch --show-current` devuelve `fase-1-scaffolding` |
| 10 | Sin archivos PHP en src/ | No hay archivos `.php` en `src/` ni `public/` |

## Checklist de verificación

```bash
# 1. Dev server
pnpm astro dev

# 2. Build
pnpm astro build && test -d dist

# 3. Typecheck
pnpm astro check

# 4. No carets
! grep '\^' package.json

# 5. Directorios
test -d src/components && test -d src/layouts && test -d src/content && test -d src/pages && test -d src/styles

# 6. Content sync
pnpm astro sync

# 7. Assets
test -f public/img/Avatar.webp && test -f public/robots.txt

# 8. Tailwind funciona
grep -q 'tailwindcss' src/styles/global.css

# 9. Branch
test "$(git branch --show-current)" = "fase-1-scaffolding"
```

## Merge a main

Una vez que todos los criterios pasen:

```bash
git add -A && git commit -m "feat: fase 1 scaffolding"
git checkout main && git merge fase-1-scaffolding
git push origin main
```
