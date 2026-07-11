# Requirements — Fase 5B: Exploración de Diseños de Home

## Scope

### Incluido

- 3 páginas nuevas de inicio: `/inicio1`, `/inicio2`, `/inicio3`
- Cada variante con dirección estética distinta, todas coherentes con el tema GruvBox
- Mismo contenido (basado en `src/data/bio.json` y `src/content/`) en las 3 variantes
- Animaciones/efectos coherentes con la dirección estética de cada variante
- Enlace de navegación a las variantes (solo en dev)
- Home actual (`/`) intacta como referencia

### Excluido

- Cambios a la home actual (`/`)
- Cambios a `/blog`, `/trabajos`, `/contacto`
- Nuevas dependencias npm (todo con CSS/Tailwind ya disponible)
- i18n en estas variantes (queda para Fase 6)
- Deploy o cambios de configuración

## Decisiones de diseño

### Estructura de variantes

| Variante | Inspiración | Audiencia | Personalidad |
|---|---|---|---|
| `/inicio1` | craftz.dog editorial | Devs/designers | Premium, asimetrica, tipografía marcada |
| `/inicio2` | adalgarcia.com refinado | Devs amantes del CLI | Terminal moderno, grid limpio, microinteracciones |
| `/inicio3` | Landing moderna | Reclutadores/primera visita | Conversiones claras, hero grande, scroll experience |

### Tipografía

- **inicio1**: usar Mononoki (display bold) para headings, MesloLG para body
- **inicio2**: monospace consistente (Mononoki) — reforzar la identidad CLI
- **inicio3**: Mononoki para headings + MesloLG para body — más cercano a SaaS moderno

(Las fuentes ya están cargadas en `global.css`, no requiere imports nuevos)

### Color y tema

Las 3 variantes usan la paleta GruvBox existente (variables `--gruvbox-*`).
- **inicio1**: acentos en `--gruvbox-yellow` y `--gruvbox-orange` (cálidos, editorial)
- **inicio2**: acentos en `--gruvbox-green` y `--gruvbox-blue` (terminal, info)
- **inicio3**: acentos en `--gruvbox-yellow` para CTAs primarios, `--gruvbox-orange` para hover

### Animaciones

- **inicio1**: scroll reveals suaves (fade + translateY), sin parallax pesado. Transiciones de 400-600ms con `cubic-bezier(0.4, 0, 0.2, 1)`.
- **inicio2**: microinteracciones tipo terminal — cursor parpadeante, "typing effect" en headers con `steps()`, hover lift en cards.
- **inicio3**: scroll-triggered reveals con IntersectionObserver, glow pulse en avatar, sticky header con backdrop-filter al hacer scroll.

### Coherencia con tema GruvBox

- Mantener la identidad de paleta cálida/yellow incluso cuando se modernice
- Dots de terminal (close/min/max) solo en inicio2 (su herencia)
- En inicio1 y inicio3, usar bordes sutiles o sombras en lugar de los dots
- Respetar dark/light mode en las 3 variantes

### Responsive

- Mobile-first en las 3
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- inicio1: sidebar pasa a top en mobile
- inicio2: grid 2x2 colapsa a 1 col en mobile
- inicio3: hero full-width siempre, grid de proyectos a 1 col en mobile

### Accesibilidad

- Mantener WCAG AA en las 3
- Contraste mínimo 4.5:1 para texto
- Respetar `prefers-reduced-motion` para animaciones
- Foco visible en todos los elementos interactivos
- Landmarks semánticos (`<header>`, `<main>`, `<section>`, `<footer>`)

## Context

### Estado actual

- Fase 1-5 completadas: scaffolding, layout, home, contenido, proyectos
- Home actual en `src/pages/index.astro` con tarjetas-terminal GruvBox
- `BaseLayout.astro` con Navbar, Footer, dark/light mode, global.css
- `bio.json` con role, summary, highlights, timeline, hobbies
- Tailwind 4 + Vite plugin ya configurado
- Paleta GruvBox en CSS custom properties con variantes light/dark
- Fuentes Mononoki y MesloLG self-hosted

### Dependencias

- Ninguna nueva. Todo se construye con:
  - Astro pages/components existentes
  - Tailwind 4 ya integrado
  - CSS custom properties GruvBox ya definidas
  - Fuentes ya cargadas
  - IntersectionObserver nativo (sin librería)

### Referencias

- `specs/mission.md` — propósito del sitio
- `specs/roadmap.md` — fase 5B original
- `specs/tech-stack.md` — decisiones técnicas base
- craftz.dog — referencia de layout editorial premium
- adalgarcia.com (actual) — referencia base de identidad terminal/GruvBox
