# Review — Navbar mobile fiel al WP (v2)

**Fecha:** 2026-09-29
**Veredicto:** APPROVED

## Resumen

Inspección con chrome-devtools del WP mobile abierto reveló que el menú collapse NO es un dropdown flotante con border/shadow — es parte del navbar que se expande verticalmente. Reescribí el CSS móvil para seguir exactamente el patrón Bootstrap `.navbar-collapse` del WP.

## Cambios estructurales

### Mobile menu: ya no es dropdown flotante
- **Antes**: `.nav-collapse.is-open` tenía `position: absolute`, `backdrop-filter`, `border`, `shadow` — era un dropdown flotante
- **Ahora**: `position: static`, sin backdrop/border/shadow — parte del flow del navbar

### Patrón Bootstrap navbar-collapse replicado
- `.nav-container`: `flex-wrap: wrap` para que el collapse ocupe nueva línea
- `.nav-collapse`: `flex-basis: 100%` cuando se abre (empuja el contenido abajo)
- `.nav-collapse`: `display: none` por defecto, `display: block` cuando `.is-open`
- En desktop (≥992px): `display: flex`, `flex-basis: auto`, `order: 2`

### Items y theme toggle mobile
- `.nav-list`: `flex-direction: column`, `margin-bottom: 8px`, `align-items: flex-start`
- `.nav-link`: `padding: 8px 0` en mobile, `8px 12px` en desktop
- `.theme-toggle`: `order: 1` (aparece antes del toggler en mobile), `margin-left: auto`

### Toggler estilo WP Bootstrap
- `padding: 4px 12px` (antes 0.5rem)
- `border: 1px solid rgba(235, 219, 178, 0.15)` (transparente como WP)
- `width/height: auto` (no fijo 44x44)

### Animación
- Quitado `@keyframes menuSlideIn` — el WP no tiene animación en mobile
- Mantiene la animación 3 barras → X del toggler

## Comparación métrica exacta con WP

| Métrica | WP | Astro | ✓ |
|---------|-----|-------|---|
| `main-nav.backdropFilter` | `blur(10px)` | `blur(10px)` | ✅ |
| `container.flexWrap` | wrap | wrap | ✅ |
| `collapse.position` | static | static | ✅ |
| `collapse.flexBasis` | 100% | 100% | ✅ |
| `collapse.background` | transparent | transparent | ✅ |
| `collapse.backdropFilter` | none | none | ✅ |
| `collapse.border` | 0 | 0 | ✅ |
| `collapse.boxShadow` | none | none | ✅ |
| `navList.flexDirection` | column | column | ✅ |
| `navList.marginBottom` | 8px | 8px | ✅ |

## Verificación visual

### Mobile cerrado (671px):
- Brand "🍵 Adal Michael García" izquierda
- Toggler ☰ derecha
- Yellow border-bottom del navbar

### Mobile abierto (671px):
- Brand + toggler arriba
- Items apilados: Inicio (active), Blog, Trabajos, Contacto, repo
- Theme toggle rectangular amarillo abajo derecha
- Navbar glass se mantiene arriba

### Desktop (1440px):
- Brand amarillo izquierda
- Links en línea: Inicio, Blog, Trabajos, Contacto, repo
- Theme toggle rectangular amarillo derecha

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/styles/components/navbar.css` | Reescrito: patrón Bootstrap navbar-collapse |

## Verificación

- `pnpm build` → ✅ 0 errores
- `pnpm astro check` → ✅ 0 errors, 0 warnings
