# Review — navbar WP-faithful

**Fecha:** 2026-09-28
**Veredicto:** APPROVED

## Resumen

Cambios en `src/components/Navbar.astro`, `src/styles/components/navbar.css` y
`src/styles/global.css` para alinear el navbar con el WP adalgarcia.com.
Se renombró la clase `.gruvbox-nav` → `.main-nav`, se quitó el efecto de scroll,
se corrigió el border a `var(--gruvbox-yellow)` y se ajustó el breakpoint a 992px.

## Verificación contra checklist

- C1: [x] — `.main-nav` reemplaza a `.gruvbox-nav`. `grep` en `src/` no
  encuentra ninguna referencia a `.gruvbox-nav`, `.nav-menu`, `.is-scrolled`
  ni `--gruvbox-nav-scrolled`.
- C2: [x] — Glass effect puro: `navbar.css:8` `backdrop-filter: blur(20px)`,
  sin `saturate(...)`. Sin color de fondo.
- C3: [x] — Sin scroll effect. El `<script>` de `Navbar.astro` (líneas 69-93)
  solo tiene toggler, click-outside y matchMedia resize. Sin
  `prefers-reduced-motion` aplicado a scroll (el bloque de reduced-motion en
  `navbar.css:270-277` solo anula transitions/animations, lo cual es
  accesibilidad correcta).
- C4: [x] — Brand: `navbar.css:35` `font-size: 1.3rem`, `color: var(--gruvbox-yellow)`.
- C5: [x] — Brand hover: `navbar.css:42-45` `color: var(--gruvbox-orange)` +
  `transform: scale(1.05)`.
- C6: [x] — Nav-link underline: `navbar.css:214-229` `width: 0` → `width: 80%`
  en `:hover`/`.active`, restringido a desktop con `@media (min-width: 992px)`.
- C7: [x] — Breakpoint consistente en 992px (líneas 109, 148, 175, 213, 263 de
  `navbar.css`; matchMedia en `Navbar.astro:88`).
- C8: [x] — Border usa `var(--gruvbox-yellow)` (`navbar.css:11`). No se
  encontró `--bs-yellow` en `src/` (solo existe en `themeWp/`, fuera de
  scope).
- C9: [x] — JS sin scroll listener ni check de reduced-motion para scroll.
- C10: [x] — `pnpm build` → 25 páginas, 0 errores. `pnpm check` → 0 errors,
  0 warnings (18 hints de deprecación de `z` en `src/content.config.ts`,
  no relacionado con este cambio).

## Notas adicionales

- El `--bs-yellow` aparece en `themeWp/css/style.css` y `gruvbox.scss`, pero
  pertenece al theme legacy y no se está importando al build actual.
- `--gruvbox-mobile-menu` existe en `global.css` y se usa correctamente en
  `navbar.css:126` (dropdown móvil).
- La marca ahora se llama `.nav-brand` (no `.navbar-brand`) por consistencia
  con el resto del namespace `nav-*`, lo cual es coherente con la
  reorganización por componentes (`specs/roadmap.md` Fase 1).

## Archivos revisados

| Archivo | Estado |
|---|---|
| `src/components/Navbar.astro` | OK |
| `src/styles/components/navbar.css` | OK |
| `src/styles/global.css` | OK |
