# Requirements: contenido-pendiente

## Scope

### Incluido
- Crear 1-2 proyectos Markdown de ejemplo adicionales en `src/content/projects/`
- Implementar paginación real del blog con rutas `/blog/page/[n]`
- Navegación entre páginas (anterior/siguiente)

### Excluido
- Migración completa de todos los datos de `themeWp/`
- Cambios de diseño visual (colores, layouts, tipografía)
- Internacionalización (i18n)
- SEO, RSS, sitemap, optimización de imágenes

## Decisions
- Los proyectos de ejemplo se basarán en datos reales de `themeWp/Works/` para mantener coherencia
- La paginación usará `paginate()` nativo de Astro (SSG genera páginas estáticas)
- `/blog` seguirá existiendo como ruta principal (alias de página 1)

## Context
- Proyecto ya tiene content collections configuradas (`blog` y `projects`) con Zod schema
- La paginación actual en `src/pages/blog/index.astro` usa `slice()` con `page=1` hardcodeado
- `themeWp/` contiene datos de trabajos reales del WordPress original
- `@astrojs/sitemap` ya está configurado, generará URLs de páginas nuevas automáticamente
