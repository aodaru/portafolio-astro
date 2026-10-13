# Validation — Fase 8: Rediseño Home (Terminal Refinado)

## Verificación manual

### Comparación `/` vs `/preview`

- [ ] `/preview` carga sin errores en consola
- [ ] Mismo contenido que `/` (nombre, rol, about, proyectos, hobbies, contacto, i18n ES/EN)
- [ ] Secciones visualmente distintas: About con tinte verde, Work con tinte azul + línea, Hobbies compacta, CTA con gradiente superior
- [ ] Ritmo de padding perceptible (7 → 7 → 5 → 8rem)
- [ ] Hero: stagger de las 3 líneas del nombre, border-left naranja en "Michael", eyebrow verde, keywords azules
- [ ] Cards de proyecto en grid vertical con thumb + body + footer; hover con lift + sombra + borde yellow
- [ ] CTA: cursor `█` parpadeante, sociales con prefijo `→` verde
- [ ] Chips de hobbies con ciclo de color (blue/orange/yellow); labels por sección (yellow/blue/green/orange)
- [ ] Taza con float sutil

### Tema y responsive

- [ ] Dark mode: tintes y gradientes legibles, sin pérdida de contraste
- [ ] Light mode: tintes y gradientes legibles, sin pérdida de contraste
- [ ] Toggle persiste tras recargar (localStorage)
- [ ] Mobile (<768px): hero apilado, grid de proyectos a 1 col, sin overflow horizontal por el full-bleed
- [ ] Tablet (768-1024px): layout intermedio funcional
- [ ] Desktop (>1024px): hero full-bleed, grid 3 cols

### Accesibilidad

- [ ] Tab navega todos los interactivos en orden lógico; foco visible
- [ ] Contraste texto WCAG AA en ambos temas
- [ ] `prefers-reduced-motion: reduce` desactiva stagger, float, blink y reveals (verificar en DevTools)
- [ ] Landmarks semánticos intactos (`header`, `main`, `section`, `footer`)

### Post-aprobación

- [ ] Cambios portados de `preview.astro` a `index.astro` (ES + EN heredan por i18n)
- [ ] `preview.astro` eliminada; build no genera `/preview`

## Verificación técnica

- [ ] `pnpm astro check` sin errores (0 errors, 0 warnings)
- [ ] `pnpm build` completo sin errores
- [ ] `dist/` no incluye `preview/` tras la limpieza
- [ ] Sin dependencias nuevas (`package.json` / `pnpm-lock.yaml` intactos)
- [ ] Sin caret en versiones (por AGENTS.md)
- [ ] Solo 3 archivos tocados: `src/styles/pages/home.css`, `src/styles/global.css`, `src/pages/index.astro` (vía preview)

## Criterios de aceptación

1. Las 4 secciones se distinguen a simple vista (no solo por el texto)
2. Las cards de proyecto tienen gancho visual (thumb + hover rico)
3. El hero tiene "momento" (stagger + acentos de color nuevos) sin perder identidad
4. La paleta sigue siendo GruvBox, pero cada sección tiene protagonista cromático propio
5. Responsive funcional en mobile/tablet/desktop, ambos temas
6. Accesibilidad base (foco, contraste, reduced-motion)

## Cómo validar

```bash
# Desde la raíz del proyecto (pnpm, sin npm/npx)
pnpm dev
# Abrir http://localhost:4321/ y http://localhost:4321/preview
# Comparar lado a lado; probar toggle de tema; DevTools responsive;
# emular prefers-reduced-motion; tabular con Tab

pnpm astro check
pnpm build
# Tras aprobar y eliminar preview:
# ls dist/preview/index.html  # Debe fallar (no existe)
```

## Checklist final antes de merge

- [ ] Spec revisada y aprobada
- [ ] Preview eliminada tras portar cambios
- [ ] Código sin comentarios innecesarios
- [ ] Versiones sin caret
- [ ] Sin secrets en código
- [ ] Sin TODOs/placeholders
- [ ] Commit messages claros con prefijo `feat:`
