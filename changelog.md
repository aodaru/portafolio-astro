# Review — Navbar glass effect WP-style

**Fecha:** 2026-09-28
**Veredicto:** APPROVED (post-fix)

## Resumen

Se revisaron los 5 archivos modificados para replicar el glass effect y scroll del WP adalgarcia.com. Build y typecheck pasan en 0 errores tras correcciones.

## Cambios aplicados (replicando adalgarcia.com)

### 1. Glass effect puro en navbar
- **`backdrop-filter: blur(20px) saturate(180%)`** (estándar + webkit)
- `background-color: transparent` por defecto

### 2. Scroll effect
- Cuando `window.scrollY > 20`, se añade clase `.is-scrolled`
- `background-color: var(--gruvbox-nav-scrolled)` (más opaco)
- `box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25)` (más profunda)
- Listener `{ passive: true }`
- Respeta `prefers-reduced-motion`

### 3. Body padding-top
- De `pt-16` (64px) a `pt-28` (112px) para coincidir con WP `main { padding-top: 100px }`

### 4. Video y intro card del home
- `.wp-video`: hover `scale(1.05)`, fadeUp `translateY(30px)`
- `.wp-intro`: padding `2rem`, fadeUp `translateY(30px)`

### 5. Bug fix mailto
- `mailto:{t.email}` → ``mailto:${t.email}`` (interpolado)

## Correcciones aplicadas post-review

### CR-1: CSS duplicado en navbar.css
- **Antes**: 3 líneas con webkit-backdrop-filter duplicado
- **Después**: 1 línea estándar + 1 línea webkit, ambas con `blur(20px) saturate(180%)`

### CR-2: Typecheck error en Navbar.astro
- **`toggler.setAttribute` → `toggler?.setAttribute`** en handler de click outside (línea 84)

## Checklist final

1. ✅ Glass effect puro (blur + saturate sin bg)
2. ✅ Clase `.is-scrolled` aplicada al scroll > 20px
3. ✅ JS respeta `prefers-reduced-motion`
4. ✅ Body padding-top 112px (≈ WP 100px)
5. ✅ `.wp-video` scale(1.05) en hover, translateY(30px) en fadeUp
6. ✅ `.wp-intro` padding 2rem
7. ✅ Variables `--gruvbox-nav-scrolled` light/dark
8. ✅ Dark mode con glass + scroll
9. ✅ Reduced motion respetado en todos los componentes
10. ✅ Build 0 errores, typecheck 0 errors

## Verificación

- `pnpm build` → ✅ 25 páginas, 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings

## Archivos modificados

| Archivo | Estado |
|---|---|
| `src/styles/components/navbar.css` | ✅ Glass + is-scrolled, sin duplicación |
| `src/styles/global.css` | ✅ Variable --gruvbox-nav-scrolled |
| `src/components/Navbar.astro` | ✅ Scroll listener + optional chaining |
| `src/layouts/BaseLayout.astro` | ✅ pt-28 aplicado |
| `src/styles/pages/home.css` | ✅ Video scale + intro padding |
| `src/pages/index.astro` | ✅ mailto bug fix |
