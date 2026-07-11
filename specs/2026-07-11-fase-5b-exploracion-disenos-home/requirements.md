# Requirements — Fase 5B: Exploración de Diseños de Home

## Scope

### Incluido (5B.1)

- 3 páginas nuevas de inicio: `/inicio1`, `/inicio2`, `/inicio3`
- Cada variante con dirección estética distinta, todas coherentes con el tema GruvBox
- Mismo contenido (basado en `src/data/bio.json` y `src/content/`) en las 3 variantes
- Animaciones/efectos coherentes con la dirección estética de cada variante
- Enlace de navegación a las variantes (solo en dev)
- Home actual (`/`) intacta como referencia

### Incluido (5B.2 — iteración sobre inicio3)

- 3 páginas nuevas iterando sobre la base de inicio3: `/inicio4`, `/inicio5`, `/inicio6`
- Componente reutilizable `TazaAscii.astro` con 3 variants (webm/css/svg)
- La taza de café como elemento visual protagonista en las 3 variantes
- Reimplementación de la taza como arte ASCII en CSS y SVG (no solo video)
- `/inicio3` intacta como referencia
- Navbar actualizada con enlaces `i4`, `i5`, `i6` (solo en dev)

### Excluido

- Cambios a la home actual (`/`) o a `/inicio3`
- Cambios a `/blog`, `/trabajos`, `/contacto`
- Nuevas dependencias npm (todo con CSS/Tailwind ya disponible)
- i18n en estas variantes (queda para Fase 6)
- Deploy o cambios de configuración

## Decisiones de diseño

### Estructura de variantes 5B.1

| Variante | Inspiración | Audiencia | Personalidad |
|---|---|---|---|
| `/inicio1` | craftz.dog editorial | Devs/designers | Premium, asimetrica, tipografía marcada |
| `/inicio2` | adalgarcia.com refinado | Devs amantes del CLI | Terminal moderno, grid limpio, microinteracciones |
| `/inicio3` | Landing moderna | Reclutadores/primera visita | Conversiones claras, hero grande, scroll experience |

### Estructura de variantes 5B.2 (iteración sobre inicio3 con taza)

| Variante | Taza variant | Layout taza | Animación especial |
|---|---|---|---|
| `/inicio4` | `webm` (video comprimido) | XL a la izquierda (50/50) | Float sutil + glow de fondo |
| `/inicio5` | `css` (ASCII reconstruido) | Mediana a la derecha (60/40) | Vapor animado con `~` y `°` |
| `/inicio6` | `svg` (inline con paths) | Hero centrado, sticky en About, reveal en CTA | Parallax en scroll + rotación sticky + scale-in CTA |

### Componente `TazaAscii`

- **Props**: `variant` (`webm`/`css`/`svg`), `size` (`sm`/`md`/`lg`/`xl`), `label` (accesible), `class`
- **Variant `webm`**: usa `/img/taza-cafe-compressed.webm` (246KB) con `<video autoplay muted loop playsinline>`
- **Variant `css`**: taza hecha con `<pre>` + caracteres ASCII (`╭╮╰╯│─┌┐└┘░▒▓`), vapor animado con keyframes sobre caracteres `~` y `°`
- **Variant `svg`**: taza SVG inline con paths (asa, cuerpo, base), `<text>` animado simulando vapor con `~` y `°`
- **Tamaños**: `sm` 160px / `md` 280px / `lg` 420px / `xl` 560px
- **Accesibilidad**: `role="img"` + `aria-label`, el vapor decorativo tiene `aria-hidden="true"`
- **Reduced motion**: vapor y animaciones desactivadas con `prefers-reduced-motion: reduce`

### Tipografía

- **inicio1, inicio3, inicio4, inicio5, inicio6**: Mononoki (display bold) para headings, MesloLG para body
- **inicio2**: monospace consistente (Mononoki) — reforzar la identidad CLI

(Las fuentes ya están cargadas en `global.css`, no requiere imports nuevos)

### Color y tema

Todas las variantes usan la paleta GruvBox existente (variables `--gruvbox-*`).
- **inicio1**: acentos en `--gruvbox-yellow` y `--gruvbox-orange` (cálidos, editorial)
- **inicio2**: acentos en `--gruvbox-green` y `--gruvbox-blue` (terminal, info)
- **inicio3, inicio4**: acentos en `--gruvbox-yellow` para CTAs primarios, `--gruvbox-orange` para hover
- **inicio5**: yellow para nombre, orange para acentos secundarios
- **inicio6**: yellow + orange + glow amarillo de fondo (eco del glow de inicio3)
- **Taza SVG**: gradiente `orange → yellow` para el café, gray para el vapor

### Animaciones

- **inicio1**: scroll reveals suaves (fade + translateY), sin parallax pesado
- **inicio2**: microinteracciones tipo terminal — cursor parpadeante, hover lift en cards
- **inicio3**: scroll-triggered reveals con IntersectionObserver, glow pulse, scroll line
- **inicio4**: float sutil de la taza, glow amarillo animado, fade-up del texto
- **inicio5**: fade-up al cargar, hover slide en projects list
- **inicio6**: 
  - Parallax de la taza del hero (más lenta que el scroll) con `requestAnimationFrame`
  - Taza de fondo sticky en About con rotación sutil
  - Scale-in animation de la taza en el CTA final
  - Todas las animaciones de inicio6 desactivadas con `prefers-reduced-motion`

### Coherencia con tema GruvBox

- Mantener la identidad de paleta cálida/yellow incluso cuando se modernice
- Dots de terminal (close/min/max) solo en inicio2 (su herencia)
- En inicio1, inicio3, inicio4, inicio5, inicio6, usar bordes sutiles o sombras en lugar de los dots
- La taza usa los GruvBox colors directamente (yellow/orange para café, gray para vapor)
- Respetar dark/light mode en las 6 variantes

### Responsive

- Mobile-first en las 6
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- inicio1: sidebar pasa a top en mobile
- inicio2: grid 2x2 colapsa a 1 col en mobile
- inicio3, inicio4: hero reorganiza, taza arriba + texto abajo en mobile
- inicio5: 60/40 colapsa a 1 col en mobile (texto primero, taza después)
- inicio6: hero full-width en mobile, taza sticky se desactiva (queda fixed)
- Las 6 variantes: grid de proyectos a 1 col en mobile

### Accesibilidad

- Mantener WCAG AA en las 6
- Contraste mínimo 4.5:1 para texto
- Respetar `prefers-reduced-motion` para animaciones
- Foco visible en todos los elementos interactivos
- Landmarks semánticos (`<header>`, `<main>`, `<section>`, `<footer>`)
- Taza con `role="img"` + `aria-label` (variants webm y css), `aria-hidden` en variants decorativas (sticky bg, cta)
- Videos con `autoplay muted loop playsinline` (sin sonido, sin controles — decorativos)
- `requestAnimationFrame` con `passive: true` en scroll listeners

## Context

### Estado actual

- Fase 1-5B.2 completadas: scaffolding, layout, home, contenido, proyectos, 6 variantes de home
- Home actual en `src/pages/index.astro` con tarjetas-terminal GruvBox (intacta)
- 6 variantes: `/inicio1`, `/inicio2`, `/inicio3`, `/inicio4`, `/inicio5`, `/inicio6`
- `BaseLayout.astro` con Navbar, Footer, dark/light mode, global.css
- `bio.json` con role, summary, highlights, timeline, hobbies
- `TazaAscii.astro` componente reutilizable con 3 variants
- Tailwind 4 + Vite plugin ya configurado
- Paleta GruvBox en CSS custom properties con variantes light/dark
- Fuentes Mononoki y MesloLG self-hosted

### Dependencias

- Ninguna nueva. Todo se construye con:
  - Astro pages/components existentes
  - Tailwind 4 ya integrado
  - CSS custom properties GruvBox ya definidas
  - Fuentes ya cargadas
  - `IntersectionObserver` nativo
  - `requestAnimationFrame` nativo
  - `matchMedia` nativo

### Referencias

- `specs/mission.md` — propósito del sitio
- `specs/roadmap.md` — fase 5B original
- `specs/tech-stack.md` — decisiones técnicas base
- craftz.dog — referencia de layout editorial premium
- adalgarcia.com (actual) — referencia base de identidad terminal/GruvBox
- `TazaCafeASCII.gif` original (2.1MB) — referencia visual de la taza ASCII, no usado
- `taza-cafe-compressed.webm` (246KB) — video comprimido usado en variant webm
