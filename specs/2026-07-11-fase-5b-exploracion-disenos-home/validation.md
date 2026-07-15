# Validation — Fase 5B: Exploración de Diseños de Home

## Verificación manual

### Cada variante 5B.1 (`/inicio1`, `/inicio2`, `/inicio3`)

- [x] La página carga sin errores en consola del navegador
- [x] Muestra contenido completo: nombre, rol, trabajos, bio/timeline, hobbies, contacto
- [x] Las animaciones se ejecutan en el primer load (hero entrance, reveals, etc.)
- [x] Hover states visibles en CTAs, links, tarjetas
- [x] Dark mode funciona (toggle cambia la paleta)
- [x] Light mode funciona
- [x] El toggle persiste tras recargar (localStorage)
- [x] En mobile (<768px): layout colapsa correctamente, todo el contenido es accesible
- [x] En tablet (768-1024px): layout intermedio funcional
- [x] En desktop (>1024px): layout completo visible
- [x] Tab key navega por todos los elementos interactivos en orden lógico
- [x] Foco visible en todos los elementos
- [x] Contraste de texto cumple WCAG AA
- [x] Con `prefers-reduced-motion: reduce` activo, las animaciones se reducen/desactivan

### Cada variante 5B.2 (`/inicio4`, `/inicio5`, `/inicio6`)

- [x] La página carga sin errores en consola del navegador
- [x] La taza se renderiza con la variant correcta (webm/css/svg)
- [x] En inicio4: taza XL visible a la izquierda, float sutil activo
- [x] En inicio5: taza CSS con vapor animado visible (`~` y `°` ascendiendo)
- [x] En inicio6: 
  - Taza SVG en hero se mueve con parallax al hacer scroll
  - Taza de fondo sticky en About rota sutilmente con scroll
  - Taza del CTA aparece con scale-in al entrar en viewport
- [x] Mismo contenido (bio, projects, hobbies, CTA) que inicio3
- [x] Hover states en CTAs, project cards, social links
- [x] Dark/light mode funcional con la taza visible en ambos
- [x] Reduced motion desactiva vapor, parallax y scale-in
- [x] Responsive: en mobile la taza se reacomoda según layout
- [x] No layout shift al cargar la taza CSS (contenedor con tamaño fijo)

### Componente `TazaAscii`

- [x] Las 3 variants renderizan correctamente con sus props
- [x] Tamaños `sm`/`md`/`lg`/`xl` aplican dimensiones correctas
- [x] Variant `webm` carga `/img/taza-cafe-compressed.webm` (246KB)
- [x] Variant `css` no tiene dependencias externas (0KB de imagen)
- [x] Variant `svg` es inline (sin requests adicionales)
- [x] `aria-label` personalizable funciona
- [x] Vapor de variants `css` y `svg` se desactiva con reduced-motion

### `/` (home actual) e `/inicio3`

- [x] Home actual sigue funcionando idéntica a antes de 5B
- [x] `/inicio3` sigue funcionando idéntica a cuando se implementó (5B.1)
- [x] Mismos estilos, mismas animaciones, misma estructura

### Navbar

- [x] Muestra enlaces `i1` a `i6` (solo en `pnpm dev`)
- [x] En build de producción no muestra los enlaces de variantes (verificado: 0 ocurrencias de `nav-link-dev`/`nav-dev-group` en `dist/`)

## Verificación técnica

- [x] `pnpm astro check` pasa sin errores TypeScript (0 errors, 0 warnings)
- [x] `pnpm astro build` completa sin errores (31 páginas)
- [x] El output de `dist/` incluye las 6 páginas nuevas: `/inicio1`, `/inicio2`, `/inicio3`, `/inicio4`, `/inicio5`, `/inicio6`
- [x] No hay warnings de Tailwind/CSS no usados
- [x] No se introdujeron dependencias npm nuevas (verificar `package.json` y `pnpm-lock.yaml`)

## Criterios de aceptación

1. Las 6 variantes son **visualmente distintas** entre sí (no solo cambios de color)
2. Las 6 son **coherentes con el tema GruvBox** (paleta cálida, identidad visual mantenida)
3. Las 6 tienen **animaciones con propósito** (no decoración gratuita)
4. La home actual e inicio3 **siguen intactas**
5. **Responsive** funcional en mobile/tablet/desktop
6. **Accesibilidad** básica (foco, contraste, reduced-motion)
7. **Taza integrada** de 3 formas distintas en inicio4/5/6, manteniendo coherencia visual

## Cómo validar

```bash
# Desde la raíz del proyecto
pnpm dev
# Abrir http://localhost:4321/
# Navegar a /inicio1, /inicio2, /inicio3, /inicio4, /inicio5, /inicio6
# Probar toggle de tema en cada una
# Inspeccionar responsive con DevTools
# Probar con prefers-reduced-motion activado en DevTools
# En inicio6, hacer scroll lento para ver el parallax y la rotación sticky

# Verificar typecheck y build
pnpm astro check
pnpm build
# Verificar que dist/ tiene 31 páginas
ls dist/inicio*/index.html
```

## Checklist final antes de merge

- [x] Spec revisada y aprobada
- [x] Código sin comentarios innecesarios (solo los estrictamente requeridos en CSS y scripts)
- [x] Versiones de dependencias sin caret (per AGENTS.md)
- [x] Sin secrets en código
- [x] Sin TODOs/placeholders
- [x] Commit messages claros con prefijo `feat:`
- [x] PR abierto en GitHub: #1 (https://github.com/aodaru/portafolio-astro/pull/1)
