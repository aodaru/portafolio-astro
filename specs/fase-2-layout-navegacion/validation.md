# Validation — Fase 2: Layout base + Navegación

## Criterios de aceptación

> Todos deben pasar para considerar la fase completa y proceder al merge a `main`.

| # | Criterio | Cómo verificarlo |
|---|---|---|
| 1 | `BaseLayout` renderiza Navbar + Footer + slot | Inspeccionar DOM en cada página |
| 2 | Navbar visible en todas las páginas | Navegar entre Inicio, Blog, Trabajos, Contacto |
| 3 | Links de navegación funcionales | Click en cada link, URL cambia correctamente |
| 4 | Link activo se marca visualmente | La página actual tiene estilo diferente en la navbar |
| 5 | Navbar responsive | Redimensionar a <768px, menú se colapsa a hamburguer |
| 6 | Dark/Light toggle cambia colores | Click en toggle, colores cambian instantáneamente |
| 7 | Tema persiste al recargar | Cambiar a dark, recargar página, sigue en dark |
| 8 | Tema respeta `prefers-color-scheme` | Sin localStorage, el tema sigue la preferencia del SO |
| 9 | Footer visible en todas las páginas | Scroll al fondo, copyright y redes presentes |
| 10 | Páginas placeholder existen | `/blog`, `/trabajos`, `/contacto` cargan sin error 404 |
| 11 | `pnpm build` exitoso | Build genera `dist/` sin errores |
| 12 | `pnpm astro check` sin errores | Typecheck de Astro limpio |

## Checklist de verificación

```bash
# 1. Build
pnpm astro build && test -d dist

# 2. Typecheck
pnpm astro check

# 3. Páginas placeholder
test -f src/pages/blog/index.astro
test -f src/pages/trabajos/index.astro
test -f src/pages/contacto.astro

# 4. Componentes
test -f src/components/Navbar.astro
test -f src/components/Footer.astro
test -f src/components/ThemeToggle.astro

# 5. Layout actualizado
grep -q 'Navbar' src/layouts/BaseLayout.astro
grep -q 'Footer' src/layouts/BaseLayout.astro

# 6. CSS custom properties en global.css
grep -q '\-\-color-bg' src/styles/global.css
grep -q '\-\-color-text' src/styles/global.css
grep -q '\-\-color-accent' src/styles/global.css
```

## Merge a main

Una vez que todos los criterios pasen:

```bash
git add -A && git commit -m "feat: fase 2 layout base y navegacion"
git checkout main && git merge fase-2-layout-navegacion
git push origin main
```

## Notas
- La rama de trabajo debe llamarse `fase-2-layout-navegacion`
- No mezclar con contenido real de blog/proyectos (Fases 4-5)
- El diseño debe ser responsivo desde el inicio, no postergar a Fase 8
