# Validación — Fase 7: SEO + Performance

## Estado de la fase

**⬜ PENDIENTE**

## Criterios de éxito

### 1. Meta tags dinámicos

- [ ] Cada página emite `og:title`, `og:description`, `og:image` (URL absoluta), `og:url`, `og:type`
- [ ] `og:locale` es `es_ES` en ES y `en_US` en EN, con `og:locale:alternate` cruzado
- [ ] Twitter Card (`summary_large_image`) presente en todas las páginas
- [ ] `<link rel="canonical">` coincide con la URL actual (ES raíz, EN `/en/...`)
- [ ] Detalle de blog/trabajo usa la `image` de su frontmatter; resto usa la imagen por defecto

### 2. RSS bilingüe

- [ ] `/rss.xml` contiene solo posts `lang: es` con links 200 (sin prefijo de idioma en la URL)
- [ ] `/en/rss.xml` contiene solo posts `lang: en` con links 200
- [ ] `<head>` incluye autodiscovery RSS del idioma correspondiente
- [ ] Fechas `pubDate` válidas y orden descendente

### 3. Imágenes y media

- [ ] Imágenes usadas viven en `src/assets/` y se renderizan con `<Image>` (WebP, `widths` responsivos)
- [ ] `dist/` no contiene las imágenes originales sin optimizar (salvo favicon)
- [ ] Hero con video: tiene `poster` y no descarga el `.webm` en eager
- [ ] Sin referencias rotas a `/img/...` tras la migración

### 4. Performance

- [ ] Lighthouse mobile 90+ en las 4 categorías en `/` y `/en/`
- [ ] Lighthouse desktop 90+ en las 4 categorías en `/` y `/en/`
- [ ] NerdFonts no bloquea el render (self-host o preload medido)
- [ ] `pnpm astro check` 0 errores, `pnpm build` sin warnings nuevos

### 5. SEO existente preservado

- [ ] Sitemap incluye ambos idiomas y coincide con canonicals
- [ ] `robots.txt` accesible y apunta al sitemap
- [ ] `hreflang` es/en/x-default intactos (Fase 6)

## Cómo verificar

```bash
# Desde la raíz del proyecto (rama feat/seo-performance)

# 1. Typecheck y build
pnpm astro check
pnpm build

# 2. Inspeccionar head (ES y EN)
grep -o '<meta property="og:[^>]*>' dist/index.html
grep -o '<meta property="og:[^>]*>' dist/en/index.html
grep -o '<link rel="canonical"[^>]*>' dist/index.html dist/en/index.html

# 3. Feeds
python3 -c "import xml.etree.ElementTree as ET; ..."
curl -s http://localhost:4321/rss.xml | head -20
curl -s http://localhost:4321/en/rss.xml | head -20

# 4. Imágenes optimizadas
ls dist/_astro/ | grep -i -E 'webp|avif'

# 5. Lighthouse (requiere pnpm preview o deploy preview)
# Chrome DevTools → Lighthouse → mobile + desktop sobre / y /en/
```

## Criterio de merge a main

- [ ] Todos los criterios de éxito marcados como completados
- [ ] Rebase al día con `feat/internacionalizacion` (o main si PR #2 ya mergeó)
- [ ] PR abierto en GitHub
- [ ] Validación manual ejecutada (todos los comandos de "Cómo verificar")

## Anti-criterios (lo que NO debe pasar)

- ❌ `og:image` relativa o que devuelva 404
- ❌ Canonicals apuntando a rutas inexistentes (`/es/...`)
- ❌ Feed con links rotos o mezclando idiomas
- ❌ Imágenes originales pesadas servidas en producción
- ❌ Nuevas dependencias npm
- ❌ Regressión de Fase 6 (selector de idioma, `lang`, traducciones)
