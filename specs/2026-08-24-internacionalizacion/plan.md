# Plan — Fase 6: Internacionalización

> Soporte bilingüe español/inglés con routing por subdirectorios.

## Contexto

- El sitio actual tiene contenido mixto: home en inglés, navbar/footer/blog/contacto en español
- Blog ya tiene estructura parcial: `src/content/blog/es/` (4 posts en español)
- Proyectos en `src/content/projects/` sin subdivisión por idioma (3 proyectos en español)
- `bio.json` en español
- `BaseLayout.astro` con `lang="es"` hardcodeado
- No existe `README.md`

## Estrategia i18n

- **Routing**: subdirectorios `/es/...` y `/en/...`
- **Idioma por defecto**: español (`es`)
- **Raíz `/`**: redirige a `/es/`
- **Config Astro**: `i18n` nativo de Astro 7 con `defaultLocale: 'es'`, `locales: ['es', 'en']`

---

## Grupo 1: Configuración base de i18n

1. [ ] Configurar `astro.config.ts` con `i18n.routing` (prefixAlways, defaultLocale: 'es', locales: ['es', 'en'])
2. [ ] Crear `src/i18n/es.json` con traducciones de UI (nav, footer, títulos de sección, botones)
3. [ ] Crear `src/i18n/en.json` con traducciones de UI
4. [ ] Crear `src/i18n/bio-es.json` (mover contenido de `src/data/bio.json`)
5. [ ] Crear `src/i18n/bio-en.json` con traducción de bio al inglés
6. [ ] Crear helper `src/lib/i18n.ts` para cargar traducciones por idioma

## Grupo 2: Reestructurar páginas (routing i18n)

7. [ ] Mover `src/pages/index.astro` → `src/pages/es/index.astro` (adaptar a español)
8. [ ] Crear `src/pages/en/index.astro` (versión en inglés, basada en el contenido actual)
9. [ ] Mover `src/pages/blog/index.astro` → `src/pages/es/blog/index.astro`
10. [ ] Crear `src/pages/en/blog/index.astro`
11. [ ] Mover `src/pages/blog/[...slug].astro` → `src/pages/es/blog/[...slug].astro`
12. [ ] Crear `src/pages/en/blog/[...slug].astro`
13. [ ] Mover `src/pages/blog/page/[page].astro` → `src/pages/es/blog/page/[page].astro`
14. [ ] Crear `src/pages/en/blog/page/[page].astro`
15. [ ] Mover `src/pages/blog/tags/[tag].astro` → `src/pages/es/blog/tags/[tag].astro`
16. [ ] Crear `src/pages/en/blog/tags/[tag].astro`
17. [ ] Mover `src/pages/trabajos.astro` → `src/pages/es/trabajos.astro`
18. [ ] Crear `src/pages/en/trabajos.astro` (o `src/pages/en/work.astro`)
19. [ ] Mover `src/pages/trabajos/[...slug].astro` → `src/pages/es/trabajos/[...slug].astro`
20. [ ] Crear `src/pages/en/trabajos/[...slug].astro`
21. [ ] Mover `src/pages/contacto.astro` → `src/pages/es/contacto.astro`
22. [ ] Crear `src/pages/en/contacto.astro` (o `src/pages/en/contact.astro`)
23. [ ] Crear `src/pages/index.astro` como redirect a `/es/`

## Grupo 3: Reestructurar contenido (collections i18n)

24. [ ] Actualizar `src/content.config.ts` para soportar subdirectorios por idioma
25. [ ] Mover proyectos: `src/content/projects/*.md` → `src/content/projects/es/*.md`
26. [ ] Crear versiones en inglés de proyectos: `src/content/projects/en/*.md`
27. [ ] Crear versiones en inglés de posts: `src/content/blog/en/*.md` (al menos 1-2 posts de ejemplo)
28. [ ] Agregar campo `lang` al frontmatter de posts y proyectos (o inferir desde la ruta)

## Grupo 4: Componentes con traducciones

29. [ ] Actualizar `BaseLayout.astro` para recibir `lang` como prop y setear `<html lang={lang}>`
30. [ ] Actualizar `Navbar.astro` para usar traducciones de `src/i18n/{lang}.json`
31. [ ] Agregar selector de idioma al Navbar (ES | EN)
32. [ ] Actualizar `Footer.astro` para usar traducciones
33. [ ] Actualizar `BlogPostList.astro` para usar traducciones (fechas, "Anterior", "Siguiente", etc.)
34. [ ] Actualizar páginas de blog para usar traducciones ("Volver al blog", etc.)
35. [ ] Actualizar páginas de trabajos para usar traducciones ("Volver a trabajos", "Visitar proyecto", etc.)
36. [ ] Actualizar página de contacto para usar traducciones
37. [ ] Actualizar home (es y en) para usar traducciones y bio.json por idioma

## Grupo 5: SEO y meta tags i18n

38. [ ] Agregar `hreflang` tags en `<head>` para cada página (es ↔ en)
39. [ ] Actualizar sitemap para incluir versiones por idioma
40. [ ] Agregar `lang` attribute correcto en cada `<html>` tag

## Grupo 6: README con manual de posts bilingües

41. [ ] Crear `README.md` en la raíz del proyecto
42. [ ] Incluir sección "Cómo crear posts" con estructura de directorios
43. [ ] Documentar frontmatter requerido para posts en ambos idiomas
44. [ ] Explicar convención de nombres de archivos (mismo slug en ambos idiomas para relacionar versiones)
45. [ ] Incluir ejemplos de posts en ES y EN

## Grupo 7: Validación y limpieza

46. [ ] Verificar `pnpm astro check` sin errores
47. [ ] Verificar `pnpm build` completa sin errores
48. [ ] Validar que todas las rutas `/es/...` y `/en/...` funcionan
49. [ ] Validar selector de idioma en Navbar
50. [ ] Validar que el redirect `/` → `/es/` funciona
51. [ ] Validar dark/light mode en ambas versiones de idioma
52. [ ] Validar responsive en ambas versiones de idioma
53. [ ] Eliminar `src/data/bio.json` (reemplazado por `src/i18n/bio-*.json`)

## Grupo 8: Documentación y merge

- [ ] Commit de todos los cambios
- [ ] Push de la rama `feat/internacionalizacion`
- [ ] Crear PR
- [ ] Validar criterios de éxito (ver `validation.md`)
- [ ] Mergear y limpiar
