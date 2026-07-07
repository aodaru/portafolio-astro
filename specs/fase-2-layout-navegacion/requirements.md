# Requirements — Fase 2: Layout base + Navegación

## Ámbito
Esqueleto visual del sitio: layout global, barra de navegación responsive, sistema de color con dark/light mode, footer. Páginas placeholder para todas las secciones navegables.

## Contexto
- Fase 1 dejó el scaffolding listo: Astro 7, Tailwind v4, content collections, assets migrados
- No existe UI todavía — solo un `index.astro` mínimo
- El tema WordPress original usaba GruvBox + Bootstrap, pero el rediseño es completo
- Dark/light mode debe persistir en `localStorage`

## Decisiones técnicas

| Decisión | Opción | Notas |
|---|---|---|
| Paleta de colores | **Nueva paleta personalizada** | Rediseño completo, no se hereda GruvBox |
| Iconos | **Lucide** (npm) | `lucide` vía CDN o npm package ligero |
| Fuentes | **Self-hosted desde themeWp/fonts/** | MesloLG-M y Mononoki ya migradas en Fase 1 |
| Dark/Light | **CSS custom properties + clase en `<html>`** | Toggle + `prefers-color-scheme` + `localStorage` |
| Navegación | **Sticky top, mobile hamburger** | Responsive: hamburger en mobile, horizontal en desktop |

## Paleta de colores (pendiente de definir)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#0a0a0b` | Fondo principal |
| `--color-surface` | `#f5f5f5` | `#1a1a1b` | Tarjetas, contenedores |
| `--color-text` | `#1a1a1a` | `#e4e4e7` | Texto principal |
| `--color-text-muted` | `#71717a` | `#a1a1aa` | Texto secundario |
| `--color-accent` | `#6366f1` | `#818cf8` | Links, hover, accent |
| `--color-border` | `#e4e4e7` | `#27272a` | Bordes |

> Los valores exactos se ajustarán durante implementación. La paleta se define como CSS custom properties en `global.css`.

## Páginas placeholder requeridas

| Ruta | Título | Descripción |
|---|---|---|
| `/` | Inicio | Hero + secciones resumen |
| `/blog` | Blog | Listado de posts (vacio por ahora — Fase 4) |
| `/trabajos` | Trabajos | Grid de proyectos (vacio por ahora — Fase 5) |
| `/contacto` | Contacto | Formulario / redes |

## Componentes a crear

| Componente | Archivo | Descripción |
|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | Shell HTML con `<head>`, slots, footer |
| Navbar | `src/components/Navbar.astro` | Barra de navegación responsive |
| Footer | `src/components/Footer.astro` | Copyright + redes sociales |
| ThemeToggle | `src/components/ThemeToggle.astro` | Botón dark/light mode |

## Lo que NO incluye esta fase
- Contenido real de blog/proyectos (Fases 4-5)
- Hero con avatar y secciones de home (Fase 3)
- Página individual de blog/proyecto (Fases 4-5)
- Animaciones ni transiciones (Fase 8)
- Internacionalización (Fase 6)
