# Review — Animación de colapso del navbar (Bootstrap collapse)

**Fecha:** 2026-09-29
**Veredicto:** APPROVED

## Resumen

El usuario reportó que el menú mobile se abría "de golpe" — faltaba la animación de altura. Inspeccioné el WP con chrome-devtools y confirmé que usa el patrón Bootstrap collapse (`height 0.35s` + clases `collapse`/`collapsing`/`show`). Implementé ese patrón en el JS y CSS del Navbar.

## Implementación

### CSS — clases Bootstrap collapse
```css
.nav-collapse {
  display: block;
  flex-basis: 100%;
  order: 3;
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}

.nav-collapse.collapse:not(.show) { display: none; }
.nav-collapse.collapsing {
  display: block;
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
.nav-collapse.collapse.show {
  display: block;
  height: auto;
  overflow: visible;
}
```

### JS — toggle con animación de altura
- Al abrir: `height: 0px` → forzar reflow → `height: ${scrollHeight}px`
- Al cerrar: `height: ${scrollHeight}px` → forzar reflow → `height: 0px`
- Listener `transitionend` para limpiar estilos y aplicar `show` o quitarlo

## Comparación métrica con WP

| Métrica | WP | Astro | ✓ |
|---------|-----|-------|---|
| `transition` en collapse | `height 0.35s` | `height 0.35s` | ✅ |
| `overflow` durante transición | `hidden` | `hidden` | ✅ |
| Clase durante animación | `collapsing` | `collapsing` | ✅ |
| Clase al finalizar abrir | `collapse show` | `collapse show` | ✅ |
| Altura final abierto | `auto` (calculada) | `auto` | ✅ |
| Altura inicial cerrado | `0` | `0` | ✅ |

## Verificación visual

A los 150ms (mitad de los 350ms), la altura del collapse era 161px (entre 0 y 246px), confirmando la animación interpolada.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/components/Navbar.astro` | JS reescrito: Bootstrap collapse con animación de altura |
| `src/styles/components/navbar.css` | Clases `.collapse`/`.collapsing`/`.show` + transition `height 0.35s` |

## Verificación

- `pnpm build` → ✅ 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings
