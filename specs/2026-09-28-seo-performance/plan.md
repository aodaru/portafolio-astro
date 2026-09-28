# Plan — Fase 7: SEO + Performance

Plan secuencial. Cada grupo debe completarse antes de pasar al siguiente.
Marcar checkboxes al ejecutar.

## Grupo 1: Auditoría baseline

1. [ ] Correr Lighthouse (mobile + desktop) sobre `/` y `/en/` y registrar scores
   - Performance, Accessibility, SEO, Best Practices
2. [ ] Inventariar `<head>` actual (`BaseLayout.astro`): title, description, hreflang, favicon, NerdFonts CDN
3. [ ] Revisar `dist/sitemap-*.xml`, `dist/robots.txt`, `dist/rss.xml`
4. [ ] Inventariar assets pesados: videos en `public/img/*.webm|*.mp4`, imágenes en `public/img/posts`, `public/img/Works`, fuentes en `public/fonts`
5. [ ] Verificar dónde se usa el campo `image` del frontmatter (listados/detalle lo renderizan o no)

## Grupo 2: Meta tags dinámicos bilingües

6. [ ] Extender props de `BaseLayout.astro`: `image?`, `type?` (website/article), `publishedDate?`
7. [ ] Agregar OG tags: `og:title`, `og:description`, `og:image` (absoluta), `og:url`, `og:locale` (`es_ES`/`en_US` + `og:locale:alternate`)
8. [ ] Agregar Twitter card tags (`summary_large_image`)
9. [ ] Agregar `<link rel="canonical">` por página (ES raíz, EN con `/en/`)
10. [ ] Definir `og:image` por defecto (`public/img/Avatar.webp` o dedicada) y usar `image` del frontmatter en detalle blog/trabajos
11. [ ] Pasar `image` desde páginas de detalle (`blog/[...slug]`, `trabajos/[...slug]`, ES + EN)

## Grupo 3: RSS bilingüe

12. [ ] Corregir links rotos del feed actual (`/blog/${post.id}` incluye prefijo de idioma)
13. [ ] Dividir feeds: `/rss.xml` (solo `lang: es`) + `/en/rss.xml` (solo `lang: en`)
14. [ ] Agregar autodiscovery en `<head>` (`<link rel="alternate" type="application/rss+xml">` por idioma)
15. [ ] Actualizar `README.md` con la convención de feeds

## Grupo 4: Imágenes con `astro:assets`

16. [ ] Mover imágenes usadas de `public/img/` a `src/assets/` (mantener favicon y `robots.txt` en `public/`)
17. [ ] Migrar renderizados a `<Image>` con formatos modernos (WebP) y `widths` responsivos
18. [ ] Hero: `poster` para el video de la taza + `preload="metadata"` (evitar descarga eager del `.webm`)
19. [ ] Verificar que `dist/` emite imágenes optimizadas y que no quedan referencias rotas

## Grupo 5: Performance (Lighthouse 90+)

20. [ ] Resolver NerdFonts por CDN (self-host del subset usado o `preload` + `display=swap`; medir antes/después)
21. [ ] Revisar CSS/JS bloqueante y `prefers-reduced-motion` para el video
22. [ ] Re-correr Lighthouse mobile + desktop en `/` y `/en/`; iterar hasta 90+ en las 4 categorías
23. [ ] Verificar `pnpm astro check` (0 errores) y `pnpm build` sin warnings nuevos

## Grupo 6: Validación y limpieza

24. [x] Validar sitemap incluye ambos idiomas y canonicals coinciden
25. [x] Validar `robots.txt` + feeds RSS (items, fechas, links 200)
26. [x] Validar OG con inspector (tags presentes, imagen absoluta 200, locale correcto por idioma)
27. [x] Tildar items de Fase 7 en `specs/roadmap.md`
28. [x] Commitear resto pendiente de Fase 6 (`astro.config.ts` con bloque i18n) en commit separado

## Grupo 7: Documentación y merge

- [x] Commit de todos los cambios
- [x] Push de la rama
- [x] Crear PR
- [x] Validar criterios de éxito (ver `validation.md`; local verificado post-merge, Perf 90+ pendiente deploy preview Fase 8)
- [x] Mergear y limpiar (PR #3 mergeado a `feat/internacionalizacion`, 2026-09-28)
