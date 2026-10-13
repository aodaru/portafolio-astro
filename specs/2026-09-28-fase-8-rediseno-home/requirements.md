# Requirements — Fase 8: Rediseño Home (Terminal Refinado)

## Scope

### Incluido

- Evolución visual de la landing (`/`, `/en/`) manteniendo la identidad GruvBox/terminal
- 7 prioridades ordenadas por impacto (ver `plan.md`)
- Cambios solo en `src/styles/pages/home.css`, `src/styles/global.css` y markup de `src/pages/index.astro`
- Página temporal `/preview` para comparar antes/después (se elimina tras aprobar)
- i18n ES/EN intacto (sin texto hardcodeado)
- Dark/light mode intacto (solo CSS custom properties `--gruvbox-*`)
- `prefers-reduced-motion: reduce` respetado en toda animación nueva

### Excluido

- Rediseño completo o cambio de identidad (no se abandona GruvBox ni Mononoki/MesloLG)
- Cambios a `/blog`, `/trabajos`, `/contacto` (quedan para Polish si aplica)
- Cambios a `Navbar.astro`, `Footer.astro`, `TazaAscii.astro`
- Nuevas dependencias npm (solo CSS + Tailwind 4 ya integrado)
- Cambio de rutas, contenido o traducciones
- Deploy o cambios de configuración

## Diagnóstico

Comparativa WordPress vivo (`adalgarcia.com`, aún WP + Bootstrap) vs. Astro en código:

| Aspecto | WP vivo | Astro actual |
|---|---|---|
| Layout home | Stack vertical: video → intro → nombre/avatar → 4 cards Bootstrap de colores | Hero video + SVG → secciones scroll-reveal → CTA |
| Cards | Headers de color sólido por sección (azul/verde/celeste/amarillo) | Lista texto 01/02/03, monocromática |
| Tipografía | Mononoki (headings) + sans sistema (body), inconsistente | 100% monospace, coherente pero pesada |
| Imágenes | Thumbs 160px sin optimizar | WebP + `astro:assets`, diferido |
| Performance | 14 scripts Bootstrap + GTM + beacons, pesado | SSG puro, video diferido, preload fino |
| SEO | Yoast, schema, sitemap | OG, sitemap, RSS bilingüe, hreflang |

Problemas concretos que motivan la fase (reportados por el usuario + análisis):

1. **Paleta** — yellow/orange en todas partes, sin contraste intencional
2. **Layout** — todas las secciones `.sec8` idénticas (mismo padding, misma estructura, mismo border-top)
3. **Hero** — patrón SaaS genérico (texto izq + visual der), sin "momento"
4. **Cards** — texto plano, sin thumbnails ni indicadores visuales
5. **Sensación template** — sin ritmo visual, sin microinteracciones sofisticadas

## Decisiones de diseño

### Dirección: Terminal Refinado

Evolucionar el aesthetic actual, no reemplazarlo. Preservar GruvBox + monospace + taza de café, añadiendo riqueza.

### Mapa de distribución de color

| Sección | Label | Acento | Botón/Link | Card BG |
|---------|-------|--------|------------|---------|
| Hero | verde | naranja (border-left) | naranja primary | — |
| About | amarillo | — | amarillo link | — |
| Work | azul | azul (línea decorativa) | — | gradiente azul |
| Hobbies | verde | multi-ciclo | — | — |
| CTA | naranja | amarillo (gradiente top) | naranja primary | dorado |

### Tipografía

- Se mantienen Mononoki (display) + MesloLG (body), self-hosted
- Se añaden variables de escala en `global.css`: `--fs-hero`, `--fs-section`, `--fs-body`, `--fs-small`, `--fs-micro`
- `sec8-h2` sube a `clamp(2rem, 4.5vw, 3rem)`; `sec8-p` a `line-height 1.75`, `max-width 55ch`

### Color y tema

- Solo variables `--gruvbox-*` existentes; tintes con `rgba()` de esos mismos colores
- Dark/light automáticos (sin valores hardcodeados por tema)

### Animaciones

- Stagger en líneas del hero (0.1s / 0.25s / 0.4s), `fadeUp` existente
- Float sutil de la taza (`tazaFloat`, 6s loop)
- Cursor `█` parpadeante en CTA (`blink` existente)
- Todo desactivado con `prefers-reduced-motion: reduce`

### Coherencia GruvBox

- Cada sección usa un color protagonista distinto, pero todos de la paleta
- Amarillo deja de estar en todas partes; se reserva para About + detalles CTA

### Responsive

- Mobile-first; breakpoints existentes (<768px, 768-1024px, >1024px)
- Grid de proyectos: `auto-fit, minmax(280px, 1fr)` → 1 col en mobile
- Hero full-bleed con `margin` negativo compensado por padding

### Accesibilidad

- WCAG AA, contraste 4.5:1 mínimo
- `prefers-reduced-motion` en toda animación nueva
- Foco visible, landmarks semánticos sin cambios
- Sin texto hardcodeado (i18n intacto)

## Context

### Estado actual

- Fases 1-7 completadas; home en `src/pages/index.astro` (179 líneas) con hero video + SVG
- Estilos home en `src/styles/pages/home.css` (471 líneas); variables en `src/styles/global.css`
- Componentes `Navbar`, `Footer`, `TazaAscii` sin cambios en esta fase
- Tailwind 4 + Vite plugin; pnpm; sin caret en versiones

### Dependencias

- Ninguna nueva. Todo con CSS + Tailwind existentes, `IntersectionObserver` nativo.

### Referencias

- `specs/mission.md` — propósito del sitio
- `specs/roadmap.md` — roadmap (se añade Fase 8)
- `specs/tech-stack.md` — decisiones técnicas base
- `specs/2026-07-11-fase-5b-exploracion-disenos-home/` — exploración previa y decisiones de taza
- `themeWp/css/style.css` — tema WP original (referencia, no se migra tal cual)
- `https://adalgarcia.com/` — sitio vivo aún en WordPress (referencia visual)
