# Review — Navbar glass effect WP-style

**Fecha:** 2026-09-28
**Veredicto:** CHANGES_REQUESTED

## Resumen

Se revisaron los 5 archivos modificados para replicar el glass effect y scroll del WP adalgarcia.com. **El build pasa pero `pnpm astro check` falla con 1 error**, lo que viola la regla dura del revisor ("nunca aprobar con tests rojos"). Además hay un problema de calidad en el CSS: la regla `backdrop-filter` sin prefijo no incluye `saturate(180%)` como pedía la spec, y la versión webkit aparece duplicada.

## Checklist de revisión

1. ❌ **Glass effect puro** — `src/styles/components/navbar.css:8-10`: `backdrop-filter: blur(20px)` estándar **NO incluye `saturate(180%)`**; la versión webkit aparece **duplicada** (línea 9 = solo blur, línea 10 = blur+saturate). Solo navegadores webkit ven la saturación; en navegadores modernos (Chromium/Firefox sin prefijo) el efecto está incompleto respecto a la spec "fiel al WP".
2. ✅ **Clase `.is-scrolled`** — `Navbar.astro:99-103`: aplica `is-scrolled` cuando `window.scrollY > 20`. CSS `navbar.css:18-21` añade `background-color: var(--gruvbox-nav-scrolled)` y shadow más fuerte.
3. ✅ **prefers-reduced-motion** — `Navbar.astro:96-97`: bloque `if (nav && !reducedMotion)` impide registrar el scroll listener si el usuario prefiere reduced motion. Correcto.
4. ✅ **Body padding-top** — `BaseLayout.astro:34`: `pt-28` (112px). El implementador comenta que WP usa 100px; 112px es 12px más pero aceptable y más generoso para evitar solapamiento.
5. ✅ **.wp-video** — `home.css:38` `transform: scale(1.05)` en hover ✅, `home.css:29` `transform: translateY(30px)` ✅.
6. ✅ **.wp-intro padding** — `home.css:60`: `padding: 2rem` ✅.
7. ✅ **Variable `--gruvbox-nav-scrolled`** — `global.css:72` light (`rgba(251, 241, 199, 0.85)`) + `global.css:86` dark (`rgba(40, 40, 40, 0.85)`). Ambos temas cubiertos.
8. ✅ **Dark mode + glass + scroll** — Las variables usan `[data-theme="dark"]` correctamente. El glass (transparente) deja pasar el fondo, el scrolled aplica overlay opaco.
9. ✅ **Reduced motion en componentes** — `navbar.css:23-27, 283-291`, `home.css:42-51, 80-86, 194-206, 231-237, 419-425`: bloques `@media (prefers-reduced-motion: reduce)` presentes.
10. ❌ **Build + typecheck** — `pnpm build` pasa (25 páginas, 0 errores). **Pero `pnpm astro check` falla con 1 error**:
    - `src/components/Navbar.astro:84` — `error ts(18047): 'toggler' is possibly 'null'`. El implementador cambió `toggler?.setAttribute(...)` a `toggler.setAttribute(...)` en el handler de "click outside", eliminando el optional chaining. Aunque está dentro de un `if (!toggler?.contains(...))`, TypeScript strict no lo deduce y exige el optional chaining o un guard.

## Cambios solicitados

### Bloqueante: typecheck rojo

- **`src/components/Navbar.astro:84`** — restaurar el optional chaining:
  ```diff
  -      toggler.setAttribute('aria-expanded', 'false')
  +      toggler?.setAttribute('aria-expanded', 'false')
  ```

### Calidad CSS: glass effect incompleto

- **`src/styles/components/navbar.css:8-10`** — consolidar la regla para que `backdrop-filter` y `-webkit-backdrop-filter` queden ambos con blur+saturate (sin duplicación):
  ```css
  .gruvbox-nav {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background-color: transparent;
    /* ... */
  }
  ```
  La línea 9 actual (`-webkit-backdrop-filter: blur(20px);` sola) queda sobreescrita por la línea 10; es código muerto y crea confusión sobre qué valor aplica.

## Verificación

- `pnpm build` → ✅ 25 páginas, 925ms, 0 errores.
- `pnpm astro check` → ❌ 1 error (18047), 0 warnings, 18 hints.
- Diff revisado contra HEAD (`65934d3`).

## Archivos revisados

| Archivo | Estado |
|---|---|
| `src/components/Navbar.astro` | ❌ Error TS en línea 84 — restaurar `toggler?.setAttribute` |
| `src/styles/components/navbar.css` | ❌ Duplicación webkit-backdrop-filter; saturate ausente en regla estándar |
| `src/styles/global.css` | ✅ Variables light + dark correctas |
| `src/layouts/BaseLayout.astro` | ✅ `pt-28` aplicado |
| `src/styles/pages/home.css` | ✅ wp-video (scale 1.05, translateY 30px), wp-intro (padding 2rem, translateY 30px) |
