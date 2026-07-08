# Plan: contenido-pendiente

## 1. Proyectos de ejemplo (1-2 adicionales)

- [x] Inspeccionar `themeWp/trabajos.html` y `themeWp/Works/` para datos reales
- [x] Crear 1-2 archivos Markdown en `src/content/projects/`
  - Frontmatter: `title`, `description`, `date`, `tags`, `image`, `url`
- [x] Verificar que aparecen en `/trabajos` y en la home

## 2. Paginación del blog

- [x] Refactor `src/pages/blog/index.astro` para generar rutas `/blog/page/[n]` con `paginate()` nativo de Astro
- [x] Crear `src/pages/blog/page/[page].astro` con `paginate()`
- [x] Mantener `/blog` como alias/ruta que muestre la primera página
- [x] Agregar navegación entre páginas (enlaces anterior/siguiente)
- [x] Verificar que `/blog/[...slug]` siga funcionando sin cambios
