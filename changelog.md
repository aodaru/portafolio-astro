# Review — Navbar 100% fiel al WP

**Fecha:** 2026-09-28
**Veredicto:** APPROVED

## Resumen

Reescribí el navbar para ser 100% fiel al WP adalgarcia.com. El usuario reportó que aún había diferencias — el navbar tenía `saturate(180%)`, scroll effect con `.is-scrolled`, y clases `.gruvbox-nav`/`.nav-menu` que no coinciden con el WP. Ahora todo está alineado.

## Cambios aplicados

### Estructura fiel al WP
- **`.main-nav`** (antes `.gruvbox-nav`) — clase exacta del WP
- **`.nav-collapse`** (antes `.nav-menu`) — equivalente a `navbar-collapse` de Bootstrap
- **`.nav-container`** interno — equivalente a `.col-md-7`

### Glass effect WP puro
- **Solo** `backdrop-filter: blur(20px)` (sin `saturate(180%)` que tenía inventado)
- `background-color: transparent`
- `border-bottom: 2px solid var(--gruvbox-yellow)`
- `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)`

### Eliminado: scroll effect y `.is-scrolled`
- El WP no tiene efecto de scroll en el navbar
- Sin listener de scroll, sin `prefers-reduced-motion` check para esto
- Variable `--gruvbox-nav-scrolled` eliminada del global.css

### Brand fiel al WP
- `color: var(--gruvbox-yellow)` (antes blanco)
- `font-size: 1.3rem` (antes 1.1rem)
- Hover: `color: var(--gruvbox-orange)` + `scale(1.05)`

### Nav-link fiel al WP
- Underline: `width: 0 → 80%` en hover (antes 60%)
- Padding: `0.5rem 1rem` (antes `0.6rem 1rem`)

### Breakpoint
- 992px (`navbar-expand-lg` del WP) en lugar de 768px

### JS simplificado
- Sin scroll listener
- Sin `prefers-reduced-motion` check para scroll
- Mantiene: toggler, click outside, matchMedia resize

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/styles/components/navbar.css` | Reescrito: `.main-nav`, glass WP puro, sin saturate/scroll |
| `src/components/Navbar.astro` | `.main-nav`, `.nav-collapse`, JS simplificado |
| `src/styles/global.css` | Variable `--gruvbox-nav-scrolled` eliminada |

## Verificación

- `pnpm build` → ✅ 25 páginas, 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings

## Checklist final

1. ✅ Clase `.main-nav` reemplaza `.gruvbox-nav`
2. ✅ Glass effect solo `backdrop-filter: blur(20px)` (sin saturate)
3. ✅ Sin scroll effect ni `.is-scrolled`
4. ✅ Brand amarillo GruvBox, font-size 1.3rem
5. ✅ Brand hover: orange + scale(1.05)
6. ✅ Nav-link underline 0 → 80% en hover
7. ✅ Breakpoint 992px (no 768px)
8. ✅ Border usa `var(--gruvbox-yellow)` (no `var(--bs-yellow)`)
9. ✅ JS sin scroll listener
10. ✅ Build + check 0 errores
